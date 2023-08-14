import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	
  constructor(private http: HttpClient) { }
	
	baseUrl:string = 'http://localhost:3000'
	
	getData(type:string, page:number, limit:number, query:string, orientation:string){
		return this.http.get(`${this.baseUrl}/getData/${type}/${page}/${limit}/${query}/${orientation}`)
	}
	
	photoInfo(id:number){
		return this.http.get(`${this.baseUrl}/photoInfo/${id}`)
	}
	
	videoInfo(id:number){
		return this.http.get(`${this.baseUrl}/videoInfo/${id}`)
	}
}
