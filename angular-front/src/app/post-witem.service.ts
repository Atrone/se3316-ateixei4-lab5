//imports for post service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostWItemService {

  //construct an instance of HttpClient
  constructor(private http: HttpClient) { }
  
  //post data to the URL with the data passed in by the program
  postData(data){
    console.log(data);
    return this.http.post('/api/coll', data);
  }
}
