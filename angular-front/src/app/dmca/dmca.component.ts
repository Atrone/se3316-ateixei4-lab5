import { Component, OnInit } from '@angular/core';
import {GetService} from '../get.service';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DMCAComponent implements OnInit {

  constructor(private getService: GetService) { }

  ngOnInit() {
  }

}
