import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	toggleType: boolean = false
	typeText:string = 'Photo'
	
  constructor(private route: Router) {}
	
  ngOnInit(): void {
		const typed = new Typed('.element', {
      strings: ['Welcome To The', 'Pexels App'],
      typeSpeed: 80,
			startDelay: 1000,
			loop: true,
			loopCount: Infinity,
			showCursor: false,
		});
	}
	
	selectType(){
		this.toggleType = !this.toggleType
	}
	
	selectTypeText(text:any){
		this.typeText = text.value
		this.selectType()
	}
	
	search(q:any){
		if(q.value.length === 0){
			alert('Write something')
			return
		}
		this.route.navigate(
			['/result'],
			{queryParams: {type: this.typeText.toLowerCase(), page: 1, limit: 15, query: q.value, orientation: 'auto'}}
		)
		localStorage.setItem('query', q.value)
	}
	
}
