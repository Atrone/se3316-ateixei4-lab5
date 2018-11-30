// imports for the get service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetService {

// construct an instance of HTTPClient
constructor(private http: HttpClient) { }
  
  /*
  * This function receives a callback funtion to send back the aynchronous response from the server.
  */
  getData(callback_fun) {
      this.http.get('/api/items').subscribe(data => {
          //console.log(data[1]['name']);
          callback_fun(data);
      });
  }
  getSingleData(id : String) {
      return this.http.get('/api/items/' + id);
  }
}
