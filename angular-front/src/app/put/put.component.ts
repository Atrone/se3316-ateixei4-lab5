import { Component, OnInit } from '@angular/core';
import {PutService} from '../put.service'

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.css']
})
export class PutComponent implements OnInit {

  constructor(private _putservice: PutService) { }

  ngOnInit() {
  }
  
  updateItem()
  {
    console.log("put kinda works");
  }

}
