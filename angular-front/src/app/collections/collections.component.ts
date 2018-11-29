import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service'
import {GetService} from '../get.service'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {PutService} from '../put.service';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  SM:boolean = false;
  constructor(private postService: PostService, private getService: GetService
  , private putService : PutService) { 
  }
  ngOnInit() {
  }
  
  showMore()
  {
    this.SM = true;
  }
  
  CV()
  {
    this.getService.getData(this.CVLogic.bind(this));
  }
  
  CVLogic(res:string)
  {
    if(document.getElementById('changeVisibilityBtn').textContent == "Privatize")
    {
      document.getElementById('changeVisibilityBtn').textContent = "Publicize";
      for(var i = 0; i < res.length; i++)
      {
        console.log(res[i]['coll']);
        console.log(document.getElementById('title').value);
        if(res[i]['coll'] == document.getElementById('title').value)
        {
          console.log("we made it");
          this.putService.updateItem("hey");
          res[i]['pub'] = true;
        }
      }
    }
    else
    {
      document.getElementById('changeVisibilityBtn').textContent = "Privatize";
    }
  }
  
  collections()
  {
    console.log("hey");
    this.getService.getData(this.showCollection.bind(this));
  }
  
  publics()
  {
    this.getService.getData(this.showPublic.bind(this));
  }
  
  showCollection(res : String)
  {
    document.getElementById('collectionName').textContent = "Current Collection: " + document.getElementById('title').value;
    document.getElementById('collectionDescription').textContent = "Description: " + document.getElementById('description0').value;
    for(var i = res.length+6; i < (2*res.length)+6; i++)
    {
      if(document.getElementById(i.toString()) != null)
      {
        this.removeElement(i.toString());
      }
    }
    for(var i = res.length+6; i < (2*res.length)+6; i++)
    {
      if((res[i-(res.length+6)]['user'] == firebase.auth().currentUser.email) && (res[i-(res.length+6)]['coll'] == document.getElementById('title').value))
      {
        this.createElement("LI",i.toString(),res[i-(res.length+6)]['name'] + ", " + res[i-(res.length+6)]['desc']);
      } 
    }
  }
  showPublic(res : string)
  {
    for(var i = res.length+6; i < (2*res.length)+6; i++)
    {
      console.log((res[i-(res.length+6)]['coll']));
      console.log((res[i-(res.length+6)]['pub']));
      if((res[i-(res.length+6)]['coll']) && (res[i-(res.length+6)]['pub']))
      {
        console.log("whats up?");
        this.createElement("LI",(i+1).toString(),res[i-(res.length+6)]['name'] + ", " + res[i-(res.length+6)]['desc']);
      } 
    }
  }
  
  createElement(element,elementId,html)
  {
    let x = document.createElement(element);
    let y = document.createTextNode(html);
    x.setAttribute('id', elementId);
    x.appendChild(y);
    document.body.appendChild(x);
  }
    removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }

  
  addToCollection()
  {
    var data ={
          name : document.getElementById('name').value, 
          price : 0,
          quantity : 0,
          rating : 0,
          comment : "",
          user : firebase.auth().currentUser.email,
          desc : document.getElementById('description1').value,
          coll : document.getElementById('title').value,
          pub : false, 
      }
    this.postService.postData(data).subscribe((response)=>{
    console.log(response);
    });
  }
  

}
