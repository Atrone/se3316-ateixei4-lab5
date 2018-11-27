import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) { }
  
  deleteItem(id : String)
  {
    console.log("we're getting there");
    return this.http.delete("/api/items/" + id); 
  }
}
