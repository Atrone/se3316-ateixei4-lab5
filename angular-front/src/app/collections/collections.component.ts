import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service'
import {GetService} from '../get.service'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  SM:boolean = false;
  constructor(private postService: PostService, private getService: GetService) {
    setInterval(()=>{
      this.collections();
    },2000)
  }

  ngOnInit() {
  }
  
  showMore()
  {
    this.SM = true;
  }
  
  changeVisibility()
  {
    if(document.getElementById('visibility').textContent == "Private")
    {
      document.getElementById('visibility').textContent = "Public";
    }
    else
    {
      document.getElementById('visibility').textContent = "Private";
    }
  }
  
  collections()
  {
    this.getService.getData(this.showCollection.bind(this));
  }
  
  showCollection(res : String)
  {
    for(var i = 0; i < res.length; i++)
    {
      
    }
  }
  

}
