// imports for delete service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  
  // construct HttpClient for delete
  constructor(private http: HttpClient) { }
  
  //deletes item corresponding to the id, returns result
  deleteItem(id : String)
  {
    return this.http.delete<void>("/api/items/" + id); 
  }
  errorHandle()
  {
    alert("hey");
  }
}
