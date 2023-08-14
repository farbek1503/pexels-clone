import { Component, OnInit, ViewChildren } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
	@ViewChildren('plyr') plyrs:any;
	
	is_photo: boolean = true
	
	notPhoto:boolean = false
	notVideo:boolean = false
	
	photosData:any
	videosData:any
	
	qType:any
	qPage:any
	qLimit:any
	qQuery:any
	qOrientation:any
	
	constructor(private apiSer: ApiService, private acRoute: ActivatedRoute, private route: Router) {}
	
  ngOnInit(): void {
		this.getData()
	}
	
	getData(){
		this.acRoute.queryParams.subscribe((params:any) => {
			this.qType = params['type'];
			this.qQuery = params['query'];
			this.qLimit = params['limit'];
			this.qOrientation = params['orientation'];
			this.qPage = params['page'];
			
			this.apiSer.getData(this.qType, this.qPage, this.qLimit, this.qQuery, this.qOrientation).subscribe((res:any) => {
				if(res.data.photos){
					this.photosData = res.data.photos
					this.is_photo = true
					if(this.photosData.length === 0){
						this.notPhoto = true
					}
				}
				if(res.data.videos){
					this.videosData = res.data.videos
					this.is_photo = false
					if(this.videosData.length === 0){
						this.notVideo = true
					}
					this.plyrs.changes.subscribe(() => {
						this.plyrs.forEach((plyr:any) => {
							new Plyr(plyr.nativeElement, {
								controls: [
									'play',
									'current-time',
									'duration',
									'mute',
								]
							});
						});
					});
				}
				}, (error:any) => {
				alert('Server Error')
			})
		});
		this.pageCount()
	}
	
	prev(){
		if(this.qPage > 1) {
			this.qPage--
			this.pageCount()
			this.route.navigate(
				['/result'],
				{queryParams: {type: this.qType, page: this.qPage, limit: this.qLimit, query: this.qQuery, orientation: this.qOrientation}}
			)
			this.getData()
			}else {
			alert('Min Page')
		}
	}
	
	next(){
		this.qPage++
		this.pageCount()
		this.route.navigate(
			['/result'],
			{queryParams: {type: this.qType, page: this.qPage, limit: this.qLimit, query: this.qQuery, orientation: this.qOrientation}}
		)
		this.getData()
	}
	
	infoImg(id:any){
		this.route.navigate(
			['/info'],
			{queryParams: {type: 'photo', id}}
		)
	}
	
	infoVideo(id:any){
		this.route.navigate(
			['/info'],
			{queryParams: {type: 'video', id}}
		)
	}
	
	sortLink(data:any) {
		const result = data.sort((a:any, b:any) => a.width - b.width);
		return result[0].link
	}
	
	pageCount(){
		const count = Array.from({length: this.qPage}, (_, index) => index + 1);
		return count
	}
	
	changePage(page:any){
		this.route.navigate(
			['/result'],
			{queryParams: {type: this.qType, page: this.qPage, limit: this.qLimit, query: this.qQuery, orientation: this.qOrientation}}
		)
		this.getData()
	}
}	