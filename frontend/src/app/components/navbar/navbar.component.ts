import { Component, OnInit, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	
  constructor(private renderer: Renderer2) {}
	
	@HostListener('window:scroll', [])
	onWindowScroll() {
		const navbar = document.querySelector('nav');
		if (window.pageYOffset > 0) {
			this.renderer.addClass(navbar, 'bg-gray-500/50');
			this.renderer.addClass(navbar, 'backdrop-blur-xl');
			this.renderer.addClass(navbar, 'border-b');
			this.renderer.addClass(navbar, 'border-gray-800');
			this.renderer.addClass(navbar, 'fixed');
			} else {
			this.renderer.removeClass(navbar, 'bg-gray-500/50');
			this.renderer.removeClass(navbar, 'backdrop-blur-xl');
			this.renderer.removeClass(navbar, 'border-b');
			this.renderer.removeClass(navbar, 'border-gray-800');
			this.renderer.removeClass(navbar, 'fixed');
		}
	}
	
  ngOnInit(): void {
	}
	
}
