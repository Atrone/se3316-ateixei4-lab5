import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PutService {

  constructor(private http: HttpClient) { }
  
  updateItem(id : String)
  {
    //return this.http.put
  }
  
}
