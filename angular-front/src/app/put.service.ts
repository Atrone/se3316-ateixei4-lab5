import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PutService {

  constructor(private http: HttpClient) { }
  
  updateItem(id : String, data)
  {
    console.log("OMG HEY");
    return this.http.put('/api/items/' + id, data);
  }
  
}
