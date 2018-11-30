// imports
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
  // creates instances of PostService, GetService, and PutService
  constructor(private postService: PostService, private getService: GetService
  , public putservice : PutService) { 
  }
  ngOnInit() {
  }
  
  showMore()
  {
    this.SM = true;
  }
  
  // CV is called on the publicity button
  CV()
  {
    this.getService.getData(this.CVLogic.bind(this));
  }
  // logic to change a collection's visibility
  CVLogic(res:string)
  {
    document.getElementById('changeVisibilityBtn').textContent = "Publicize";
    for(var i = 0; i < res.length; i++)
    {
      if(res[i]['coll'] == document.getElementById('title').value)
      {
        console.log(res[i]['name']);
        console.log("we made it");
        this.CVPut(res[i]);
      }
    }
  }
  
  CVPut(oData)
  {
    console.log(oData['pub']);
      console.log("getting there. ok")
      var data =
      {
        name : oData['name'], 
        price : oData['price'],
        quantity : oData['quantity'],
        rating : oData['rating'],
        comment : oData['comment'],
        user : firebase.auth().currentUser.email,
        desc : "",
        coll : "",
        pub : true, 
      } 
    console.log(oData['_id'].toString()); 
    console.log(data);
    this.putservice.updateItem(oData['_id'].toString(),data).subscribe(data=>console.log(data));
  }
  
  // collections is called on create/edit/see button
  collections()
  {
    console.log("hey");
    this.getService.getData(this.showCollection.bind(this));
  }
  
  // public is called on see public collections button
  publics()
  {
    this.getService.getData(this.showPublic.bind(this));
  }
  
  // show collection handles the HTML logic to show the collection
  showCollection(res : String)
  {
    document.getElementById('collectionName').textContent = "Current Collection: " + document.getElementById('title').value;
    document.getElementById('collectionDescription').textContent = "Description: " + document.getElementById('description0').value;
    for(var i = 0; i < res.length; i++)
    {
      if(document.getElementById(i.toString()) != null)
      {
        this.removeElement(i.toString());
        this.removeElement((i+1).toString());
        this.removeElement((i+2).toString());
        this.removeElement((i+3).toString());
      }
    }
    for(var i = 0; i < res.length; i++)
    {
      if((res[i]['user'] == firebase.auth().currentUser.email) && (res[i]['coll'] == document.getElementById('title').value))
      {
        this.createElement("LI",i.toString(),res[i]['name'] + ", " + res[i]['desc'] + ", " + res[i]['quantity'].toString() + ", " + res[i]['user'].toString());
        this.createElement("BUTTON",(i+1).toString(),"+");
        this.createElement("BUTTON",(i+2).toString(),"-");
        this.createElement("BUTTON",(i+3).toString(),"Delete");
      } 
    }
  }
  // show public handles the logic to show the public collections
  showPublic(res : string)
  {
    for(var i = 0; i < res.length; i++)
    {
      console.log((res[i]['coll']));
      console.log((res[i]['pub']));
      if((res[i]['coll']) && (res[i]['pub']))
      {
        console.log("whats up?");
        this.createElement("LI",(i+4).toString(),res[i]['name'] + ", " + res[i]['desc']);
      } 
    }
  }
  removeItem(event, id) {
  console.log("BYE" + id);
  }
  addItem(event, id) {
  console.log("BYE" + id);
  }
  subItem(event, id) {
  console.log("BYE" + id);
  }
  
  // creates an html element
  createElement(element,elementId,html)
  {
    let x = document.createElement(element);
    let y = document.createTextNode(html);
    x.setAttribute('id', elementId);
    x.appendChild(y);
    document.body.appendChild(x);
    if(html == "Delete")
    {
      x.addEventListener("click",this.removeItem.bind(this));
    }
    else if(html == "+")
    {
      x.addEventListener("click",this.addItem.bind(this,(elementId-1)));
    }
    else if(html == "-")
    {
      x.addEventListener("click",this.subItem.bind(this));
    }
  }
  // removes an html element
    removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }

  // adds an element to collection
  addToCollection()
  {
    var data ={
          name : document.getElementById('name').value, 
          quantity : 1,
          user : firebase.auth().currentUser.email,
          desc : document.getElementById('description1').value,
          coll : document.getElementById('title').value,
          comment : "",
          price : 0, 
          rating : 0,
          pub : false, 
      }
    this.postService.postData(data).subscribe((response)=>{ 
    console.log(response);
    });
  }
  

}
