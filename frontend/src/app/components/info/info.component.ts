import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Plyr from 'plyr';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, AfterViewInit {
	is_photo:boolean = true
	downloadingFile:any;
	
	alt:string = ''
	photographer:string = ''
	photographer_url:string = ''
	
	screenTrue:boolean = true
	screenFalse:boolean = false
	rotateDegrees:number = 0;
	zoomFactor:number = 1;
	dataImg:any = [
		{landscape: ''},
		{large: ''},
		{large2x: ''},
		{medium: ''},
		{original: ''},
		{portrait: ''},
		{small: ''},
		{tiny: ''}
	]
	imgSize:any = [
		{msg: 'landscape'},
		{msg: 'large'},
		{msg: 'large2x'},
		{msg: 'medium'},
		{msg: 'original'},
		{msg: 'portrait'},
		{msg: 'small'},
		{msg: 'tiny'}
	]
	
	videoData:any
	
	constructor(private apiSer: ApiService, private acRoute: ActivatedRoute, private route: Router, private http: HttpClient, private resultCom: ResultComponent) {}
	
  ngOnInit(): void {
		this.acRoute.queryParams.subscribe((params:any) => {
			const routerType = params['type'];
			const id = params['id'];
			if(routerType == 'photo'){
				this.apiSer.photoInfo(id).subscribe((res:any) => {
					this.alt = res.data.alt
					
					this.dataImg[0].landscape = res.data.src.landscape
					this.dataImg[1].large = res.data.src.large
					this.dataImg[2].large2x = res.data.src.large2x
					this.dataImg[3].medium = res.data.src.medium
					this.dataImg[4].original = res.data.src.original
					this.dataImg[5].portrait = res.data.src.portrait
					this.dataImg[6].small = res.data.src.small
					this.dataImg[7].tiny = res.data.src.tiny
					
					this.photographer = res.data.photographer
					this.photographer_url = res.data.photographer_url
				})
			}
			
			if(routerType == 'video'){
				this.is_photo = false
				this.apiSer.videoInfo(id).subscribe((res:any) => {
					this.videoData = res.data
				})
			}
		});
	}
	
	ngAfterViewInit() {
    const video = new Plyr('#player', {
			controls: [
				'play-large', // The large play button in the center
				'restart', // Restart playback
				'rewind', // Rewind by the seek time (default 10 seconds)
				'play', // Play/pause playback
				'fast-forward', // Fast forward by the seek time (default 10 seconds)
				'progress', // The progress bar and scrubber for playback and buffering
				'current-time', // The current time of playback
				'duration', // The full duration of the media
				'mute', // Toggle mute
				'volume', // Volume control
				'captions', // Toggle captions
				'settings', // Settings menu
				'pip', // Picture-in-picture (currently Safari only)
				'airplay', // Airplay (currently Safari only)
				'fullscreen', // Toggle fullscreen
				'playback-rate', // Playback rate selection control
				'quality', // Quality selection control (if available)
				'loop', // Loop playback
			],
			settings: ['captions', 'quality', 'speed'], // Array of settings to show in the menu
			captions: {
				active: true,
				language: 'auto',
				update: false,
			},
			keyboard: {
				focused: true,
				global: false,
			},
			tooltips: {
				controls: true,
				seek: true,
			},
			fullscreen: {
				enabled: true,
				fallback: true,
				iosNative: false,
			}
		});
	}
	
	downloadFunc(s:any){
		const hour = new Date().getHours()
		const min = new Date().getMinutes()
		const sec = new Date().getSeconds()
		
		if(this.is_photo === true){
			const selectedImg = this.dataImg.filter((item: any) => Object.keys(item)[0] === s.value);
			const selectUrl = selectedImg[0][s.value];
			
			this.http.get(selectUrl, { responseType: 'blob' })
			.subscribe((response: any) => {
				const fileType = response.type.split('/')[1];
				const blob = new Blob([response], { type: `application/${fileType}` });
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = `photo_${hour}_${min}_${sec}.${fileType}`;
				link.click();
			});
		}
		
		if(this.is_photo === false){
			fetch(s.value)
			.then((res:any) => {
				this.http.get(res.url, { responseType: 'blob' })
				.subscribe((response: any) => {
					const fileType = response.type.split('/')[1];
					const blob = new Blob([response], { type: `application/${fileType}` });
					const url = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `video_${hour}_${min}_${sec}.${fileType}`;
					link.click();
				});
			})
		}
	}
	
	findLink(): string{
		let videos = this.videoData.video_files,
				originalWidth = this.videoData.width;

		const video = videos.filter((v:any) => v.width === originalWidth);
		if (video) {
			const file = video.find((f:any) => f.width === originalWidth);
			if (file) {
				return file.link;
			}
		}
		return '';
	}
	
	filterVideo(): { link: string, width: number, height: number, quality: string }[] {
		const sortedData = this.videoData.video_files.sort((a:any, b:any) => a.width - b.width)
		.map((item:any) => {
			return {
				link: item.link,
				width: item.width,
				height: item.height,
				quality: item.quality
			}
		});
		
		return sortedData
	}
	
	toggleFullScreen() {
		if (!document.fullscreenElement) {
			if(this.screenTrue = true){
				const imgScreen = document.getElementById('imgScreen') as HTMLElement
				imgScreen.requestFullscreen();
				this.screenTrue = false
				this.screenFalse = true
			}
			} else {
			if(this.screenFalse = true){
				this.screenTrue = true
				this.screenFalse = false
				this.rotateDegrees = 0
				this.zoomFactor = 1
			}
			document.exitFullscreen();
		}
	}
	
	rotateLeft() {
		this.rotateDegrees -= 90;
	}
	
	rotateRight() {
		this.rotateDegrees += 90;
	}
	
	zoomIn() {
		this.zoomFactor += 0.4;
	}
	
	zoomOut() {
		this.zoomFactor -= 0.4;
		if (this.zoomFactor < 0.4) {
			this.zoomFactor = 0.4;
		}
	}
}
