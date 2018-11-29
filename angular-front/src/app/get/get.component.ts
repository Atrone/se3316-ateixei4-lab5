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
   // handles the html logic to see all cart items
  onResponse(res: string) {
    //this.response = "<li>" + res[1]['name'] + "</li>";
    for(var i = 0; i < res.length; i++)
    {
      if(document.getElementById(i.toString()) != null)
      {
        this.removeElement(i.toString());
      }
    }
    for(var i = 0; i < res.length; i++)
    {
      this.createElement("LI",i.toString(),res[i]['name'] + "," + res[i]['price'] + "," + res[i]['tax'] + "," + res[i]['quantity']);
    }
  }
  
  //creates an html element
  createElement(element,elementId,html)
  {
    let x = document.createElement(element);
    let y = document.createTextNode(html);
    x.setAttribute('id', elementId);
    x.appendChild(y);
    document.body.appendChild(x);
  }
  // removes an element
  removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }

}
