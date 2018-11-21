import { Component, OnInit } from '@angular/core';
import {GetService} from '../get.service'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  // Initialize response with empty string
  response = '';
  
  constructor(private _getservice: GetService) { }

  ngOnInit() {
  }
  
  onClick() {
    // Call the service method, passing the onResponse as the callback
    // binding 'this' is required to avoid "this is undefined error"
    this._getservice.getData(this.onResponse.bind(this));
  }
  
  /*
   * The HTTP request is aynchronous.
   * Therefore a callback function is required to get back the response.
   */
  onResponse(res: string) {
    this.response = res;
  }

}
