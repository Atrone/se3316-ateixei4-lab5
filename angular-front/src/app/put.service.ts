import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PutService {

  constructor(private http: HttpClient) { }
  
  updateItem(id : String)
  {
    console.log("OMG HEY");
    //return this.http.put
  }
  
}
