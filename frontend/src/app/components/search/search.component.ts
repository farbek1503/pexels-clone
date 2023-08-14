import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	query:string | null = 'popular'
	limit:number = 15
	page:number = 1
	
  constructor(private route: Router) {}
	
  ngOnInit(): void {
		if(localStorage.getItem('query')){
			this.query = localStorage.getItem('query')
		}
	}
	
	search(type:any, orientation:any){
		this.route.navigate(
			['/result'],
			{queryParams: {type: type.value, page: this.page, limit: this.limit, query: this.query, orientation: orientation.value}}
		)
		localStorage.setItem('query', this.query ? this.query : 'popular')
	}
	
}
