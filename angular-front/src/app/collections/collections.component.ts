// imports
import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service'
import {GetService} from '../get.service'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {PutService} from '../put.service';
import {DeleteService} from '../delete.service';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  SM:boolean = false;
  ids:String[] = [""];
  // creates instances of PostService, GetService, and PutService
  constructor(private postService: PostService, private getService: GetService
  , public putservice : PutService, public deleteservice : DeleteService) {
    setInterval(()=>{
      this.showAll();
    },500) 
  }
  ngOnInit() {
  }
  
  showAll()
  {
    this.getService.getData(this.showAllLogic.bind(this));
  }
  showAllLogic(res:String)
  {
    for(var i = 0; i < res.length; i++)
    {
      if(document.getElementById(i.toString()) != null)
      {
        this.removeElement(i.toString());
        this.removeElement((i+1).toString());
      }
    }
    for(var i = 0; i < res.length; i++)
    {
      if((res[i]['user'] == firebase.auth().currentUser.email) && (res[i]['coll']))
      {
        this.createElement("H1",i.toString(),"Collection:" + res[i]['coll']);
        this.createElement("LI",(i+1).toString(),res[i]['name'] + ", " + res[i]['desc'] + ", " + res[i]['quantity'].toString() + ", " + res[i]['user'].toString());
      } 
    }
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
    for(var i = 0; i < res.length; i++)
    {
      if(res[i]['coll'] == document.getElementById('title').value)
      {
        this.CVPut(res[i]);
      }
    }
    if(document.getElementById('changeVisibilityBtn').textContent == "Privatize")
    {
      document.getElementById('changeVisibilityBtn').textContent = "Publicize";
    }
    else
    {
      document.getElementById('changeVisibilityBtn').textContent = "Privatize";
    }
  }
  
  // updates item with new visibility
  CVPut(oData)
  {
    console.log(oData['pub']);
    if(document.getElementById('changeVisibilityBtn').textContent == "Publicize")
    {
      console.log("getting there. ok")
      var data =
      {
        name : oData['name'], 
        price : oData['price'],
        quantity : oData['quantity'],
        rating : oData['rating'],
        comment : oData['comment'],
        user : firebase.auth().currentUser.email,
        desc : document.getElementById('description0').value,
        coll : document.getElementById('title').value,
        pub : true, 
      } 
    }
    else
    {
      var data =
      {
        name : oData['name'], 
        price : oData['price'],
        quantity : oData['quantity'],
        rating : oData['rating'],
        comment : oData['comment'],
        user : firebase.auth().currentUser.email,
        desc : document.getElementById('description0').value,
        coll : document.getElementById('title').value,
        pub : false, 
      } 
    }
    console.log(oData['_id'].toString()); 
    console.log(data);
    this.putservice.updateItem(oData['_id'].toString(),data).subscribe(data=>console.log(data));
  }
  
  deleteCollection()
  {
    if(confirm("ARE YOU SURE?"))
    {
    this.getService.getData(this.deleteCollectionLogic.bind(this));
    }
    else{}
  }
  deleteCollectionLogic(res:String)
  {
    for(var i = 0; i < res.length; i++)
    {
      if(res[i]['coll'] == document.getElementById('title').value)
      {
        this.deleteservice.deleteItem(res[i]['_id']);
      }
    }
  }
  
  renameCollection()
  {
    this.getService.getData(this.renameCollectionLogic.bind(this));
  }
  renameCollectionLogic(res:String)
  {
    for(var i = 0; i < res.length; i++)
    {
      console.log(res[i]['coll']);
      console.log((document.getElementById('collectionName').textContent.split(": ")[1]));
      if(res[i]['coll'])
      {
        if((res[i]['coll']) === (document.getElementById('collectionName').textContent.split(": ")[1]))
        {
          var data =
          {
            name : res[i]['name'], 
            price : res[i]['price'],
            quantity : res[i]['quantity'],
            rating : res[i]['rating'],
            comment : res[i]['comment'],
            user : firebase.auth().currentUser.email,
            desc : document.getElementById('description0').value,
            coll : document.getElementById('title').value,
            pub : res[i]['pub'], 
          } 
          this.putservice.updateItem(res[i]['_id'].toString(),data).subscribe(data=>console.log(data));
        }
      }
    }
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
        this.removeElement((i+4).toString());
        this.removeElement((i+5).toString());

      }
    }
    for(var i = 0; i < res.length; i++)
    {
      if((res[i]['user'] == firebase.auth().currentUser.email) && (res[i]['coll'] == document.getElementById('title').value))
      {
        this.createElement("LI",i.toString(),res[i]['name'] + ", " + res[i]['desc'] + ", " + res[i]['quantity'].toString() + ", " + res[i]['user'].toString());
        this.createElement("BUTTON",(i+1).toString(),"+",res[i]['_id']);
        this.createElement("BUTTON",(i+2).toString(),"-",res[i]['_id']);
        this.createElement("BUTTON",(i+3).toString(),"Delete",res[i]['_id']);
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
        this.createElement("H3",(i+5).toString(),res[i]['coll'] + ":");
        this.createElement("LI",(i+4).toString(),res[i]['name'] + ", " + res[i]['desc'] + ", " + res[i]['quantity'].toString() + ", " + res[i]['user'].toString());
      } 
    }
  }
  // functions to remove, add quantity, and subtract quantity, shown
  removeItem(event) {
    console.log("BYE" + id);
  }
  addItem(event) {
  console.log("BYE" + id);
  }
  subItem(event) {
  console.log("BYE" + id);
  }
  
  // creates an html element
  createElement(element,elementId,html,mLabID)
  {
    let x = document.createElement(element);
    let y = document.createTextNode(html);
    x.setAttribute('id', elementId);
    x.appendChild(y);
    document.body.appendChild(x);
    this.ids.push(mLabID);
    if(html == "Delete")
    {
      x.addEventListener("click",this.removeItem.bind(this));
    }
    else if(html == "+")
    {
      x.addEventListener("click",this.addItem.bind(this);
    }
    else if(html == "-")
    {
      x.addEventListener("click",this.subItem.bind(this);
    }
    console.log(this.ids);
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
