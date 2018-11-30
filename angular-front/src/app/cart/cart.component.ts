// imports
import { Component, OnInit } from '@angular/core'
import {GetService} from '../get.service'
import {DeleteService} from '../delete.service' 
import {ItemsComponent} from '../items/items.component'
import {PutService} from '../put.service' 
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import {ItemsService} from '../items.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ids:String[] = ["","",""];

  // constantly refresh the items in cart with the most up to date values (every 2 seconds) , creates instances of GetService and
  //DeleteService
  constructor(private getservice: GetService, public deleteservice : DeleteService, public putservice : PutService, public itemsservice:ItemsService) { 
    setInterval(()=>{
      this.getAll();
      console.log();
    },500) 
  }

  ngOnInit() {
  }
  
  // get all runs on a 2s loop
  getAll()
  {
    this.getservice.getData(this.getAllLogic.bind(this)); // get the array of mLab data
  }
  
  // handles logic for manipulating the cart's html elements
  getAllLogic(res: string) {
    console.log("that just happened");
    var total = 0;
    this.ids = ["","",""];
    document.getElementById('appleCart').textContent = "";
    document.getElementById('pearCart').textContent = "";
    document.getElementById('orangeCart').textContent = "";
    for(var i = 0; i < res.length; i++)
    {
      if(res[i]['name'])
      {
        if(res[i]['name'] == "Apple") // only create elements for the cart if there is no collection associated with this
        {
          total += (res[i]['price']*(res[i]['quantity']));
          document.getElementById('appleCart').textContent = "One order of " + res[i]['quantity'].toString() + " Apples, costing " + (res[i]['price']*(res[i]['quantity'])).toString() + "$ coming up!" ;
          this.ids[0] = res[i]['_id'];
        }
        else if(res[i]['name'] == "Pear") // only create elements for the cart if there is no collection associated with this
        {
          total += (res[i]['price']*(res[i]['quantity']));
          document.getElementById('pearCart').textContent = "One order of " + res[i]['quantity'].toString() + " Pears, costing " + (res[i]['price']*(res[i]['quantity'])).toString() + "$ coming up!" ;
          this.ids[1] = res[i]['_id'];
        }
        else if(res[i]['name'] == "Orange") // only create elements for the cart if there is no collection associated with this
        {
          total += (res[i]['price']*(res[i]['quantity']));
          document.getElementById('orangeCart').textContent = "One order of " + res[i]['quantity'].toString() + " Oranges, costing " + (res[i]['price']*(res[i]['quantity'])).toString() + "$ coming up!" ;
          this.ids[2] = res[i]['_id'];
        }
      }
    } 
    var AP = 0;
    var PP = 0;
    var OP = 0;
    if(document.getElementById('appleCart').textContent)
    {
      AP = parseInt((document.getElementById('appleCart').textContent.split("costing ")[1]).split("$")[0]);
    }
    if(document.getElementById('pearCart').textContent)
    {
      PP = parseInt((document.getElementById('pearCart').textContent.split("costing ")[1]).split("$")[0]);
    }
    if(document.getElementById('orangeCart').textContent)
    {
      OP = parseInt((document.getElementById('orangeCart').textContent.split("costing ")[1]).split("$")[0]);
    }
      document.getElementById('totals').textContent = "TOTAL COMES TO: $" + (AP+PP+OP).toString();
  }
  // deletes the apple order shown in cart (most recent) (same functionality for pears and oranges)
  deleteApples()
  {
    this.deleteservice.deleteItem(this.ids[0]).subscribe(data=>console.log(data));
  }
  deletePears()
  {
    this.deleteservice.deleteItem(this.ids[1]).subscribe(data=>console.log(data));
  }
  deleteOranges()
  {
    this.deleteservice.deleteItem(this.ids[2]).subscribe(data=>console.log(data));
  }
  // buy all items from the cart called by the buy all button
  buyAll() 
  {
    this.getservice.getData(this.buyAllLogic.bind(this)); // get the array of mLab data
  }
  // the logic behind buying all items from cart
  buyAllLogic(res: string)
  {
    var AinCart = 0;
    var PinCart = 0;
    var OinCart = 0;
    var recentA;
    var recentP;
    var recentO;
    if(confirm("Are you sure you want to buy all orders?"))
    {
      for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'] == "Apple") // only create elements for the cart if there is no collection associated with this
        {
          this.ids[0] = res[i]['_id'];
          AinCart += res[i]['quantity'];
          recentA = res[i];
        }
        else if(res[i]['name'] == "Pear") // only create elements for the cart if there is no collection associated with this
        {
          this.ids[1] = res[i]['_id'];
          PinCart += res[i]['quantity'];
          recentP = res[i];
        }
        else if(res[i]['name'] == "Orange") // only create elements for the cart if there is no collection associated with this
        {
          this.ids[2] = res[i]['_id'];
          OinCart += res[i]['quantity'];
          recentO = res[i];
        }
      }
      if(this.ids[0])
      {
        if(AinCart < (AinCart + this.itemsservice.fruitStock[0]))
        {
          this.deleteApples();
        }
        else
        {
          alert("WE DONT HAVE THAT MANY!");
        }
      }
      if(this.ids[1])
      {
        if(PinCart < (PinCart + this.itemsservice.fruitStock[1]))
        {
          this.deletePears();
        }
        else
        {
          alert("WE DONT HAVE THAT MANY!");
        }
      }
      if(this.ids[2])
      {
        if(OinCart < (OinCart + this.itemsservice.fruitStock[2]))
        {
          this.deleteOranges();
        }
        else
        {
          alert("WE DONT HAVE THAT MANY!");
        }
      }
      if((AinCart < (AinCart + this.itemsservice.fruitStock[0]))&&(PinCart < (PinCart + this.itemsservice.fruitStock[1]))&&(OinCart < (OinCart + this.itemsservice.fruitStock[2])))
      {
        alert("YOU JUST BOUGHT: " + recentA['quantity'] + " APPLES AT " + recentA['price'] + "$ PER APPLE," + recentP['quantity'] + " PEARS AT " + recentP['price'] + "$ PER PEAR, and " + recentO['quantity'] + " ORANGES AT " + recentO['price'] + "$ PER ORANGE.");
      }
      console.log(recentA);
    }
  }
  // remove all items from the cart called by the cancel button
  removeAll()
  {
    this.getservice.getData(this.removeAllLogic.bind(this)); // get the array of mlab data
  }
  // the logic behind removing all items from cart
  removeAllLogic(res: string)
  {
    if(confirm("Are you sure you want to delete all orders?"))
    {
      for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'])
        {
          if(res[i]['name'] == "Apple") // only create elements for the cart if there is no collection associated with this
          {
            this.ids[0] = res[i]['_id'];
          }
          else if(res[i]['name'] == "Pear") // only create elements for the cart if there is no collection associated with this
          {
            this.ids[1] = res[i]['_id'];
          }
          else if(res[i]['name'] == "Orange") // only create elements for the cart if there is no collection associated with this
          {
            this.ids[2] = res[i]['_id'];
          }
        }
      }
      if(this.ids[0])
      {
        this.deleteApples();
      }
      if(this.ids[2])
      {
        this.deleteOranges();
      }
      if(this.ids[1])
      {
        this.deletePears();
      }
    }
  }
  addApple()
  {
    this.getservice.getData(this.addAppleLogic.bind(this)); // get the array of mlab data
  }
  addAppleLogic(res : string)
  {
    var inCart = 0;
    for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'])
        {
          if(res[i]['name'] == "Apple") // only create elements for the cart if there is no collection associated with this
          {
            inCart += res[i]['quantity'];
            this.ids[0] = res[i]['_id'];
            var data ={
              name : res[i]['name'], 
              price : res[i]['price'],
              quantity : res[i]['quantity'] + 1,
              rating : res[i]['rating'],
              comment : res[i]['comment'],
              user : firebase.auth().currentUser.email,
              desc : "",
              coll : "",
              pub : false, 
            }
          }
        }
      }
      if((data['quantity'] + 1) > ((this.itemsservice.fruitStock[0]) + inCart))
      {
        alert("TOO MANY!!")
      }
      else
      {
    this.putservice.updateItem(this.ids[0],data).subscribe(data=>console.log(data));
      }
  }
  addPear()
  {
    this.getservice.getData(this.addPearLogic.bind(this)); // get the array of mlab data
  }
  addPearLogic(res : string)
  {
    var inCart = 0;
    for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'])
        {
          if(res[i]['name'] == "Pear") // only create elements for the cart if there is no collection associated with this
          {
            inCart += res[i]['quantity'];
            this.ids[1] = res[i]['_id'];
            var data ={
              name : res[i]['name'], 
              price : res[i]['price'],
              quantity : res[i]['quantity'] + 1,
              rating : res[i]['rating'],
              comment : res[i]['comment'],
              user : firebase.auth().currentUser.email,
              desc : "",
              coll : "",
              pub : false, 
            }
          }
        }
        
      }
      if((data['quantity'] + 1) > ((this.itemsservice.fruitStock[1]) + inCart))
      {
        alert("TOO MANY!!")
      }
      else
      {
    this.putservice.updateItem(this.ids[1],data).subscribe(data=>console.log(data));
      }
  }
  addOrange()
  {
    this.getservice.getData(this.addPearLogic.bind(this)); // get the array of mlab data
  }
  addOrangeLogic(res : string)
  {
        var inCart = 0;
    for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'])
        {
          if(res[i]['name'] == "Orange") // only create elements for the cart if there is no collection associated with this
          {
            this.ids[2] = res[i]['_id'];
            inCart += res[i]['quantity'];
            var data ={
              name : res[i]['name'], 
              price : res[i]['price'],
              quantity : res[i]['quantity'] + 1,
              rating : res[i]['rating'],
              comment : res[i]['comment'],
              user : firebase.auth().currentUser.email,
              desc : "",
              coll : "",
              pub : false, 
            }
          }
        }
      }
    if((data['quantity'] + 1) > ((this.itemsservice.fruitStock[2]) + inCart))
      {
        alert("TOO MANY!!")
      }
      else
      {
    this.putservice.updateItem(this.ids[2],data).subscribe(data=>console.log(data));
      }
  }
  subApple()
  {
    this.getservice.getData(this.subAppleLogic.bind(this)); // get the array of mlab data
  }
  subAppleLogic(res : string)
  {
    for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'])
        {
          if(res[i]['name'] == "Apple") // only create elements for the cart if there is no collection associated with this
          {
            this.ids[0] = res[i]['_id'];
            var data ={
              name : res[i]['name'], 
              price : res[i]['price'],
              quantity : res[i]['quantity'] - 1,
              rating : res[i]['rating'],
              comment : res[i]['comment'],
              user : firebase.auth().currentUser.email,
              desc : "",
              coll : "",
              pub : false, 
            }
          }
        }
      }
    this.putservice.updateItem(this.ids[0],data).subscribe(data=>console.log(data));
  }
  subPear()
  {
    this.getservice.getData(this.subPearLogic.bind(this)); // get the array of mlab data
  }
  subPearLogic(res : string)
  {
    for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'])
        {
          if(res[i]['name'] == "Pear") // only create elements for the cart if there is no collection associated with this
          {
            this.ids[1] = res[i]['_id'];
            var data ={
              name : res[i]['name'], 
              price : res[i]['price'],
              quantity : res[i]['quantity'] - 1,
              rating : res[i]['rating'],
              comment : res[i]['comment'],
              user : firebase.auth().currentUser.email,
              desc : "",
              coll : "",
              pub : false, 
            }
          }
        }
      }
    this.putservice.updateItem(this.ids[1],data).subscribe(data=>console.log(data));
  }
  subOrange()
  {
    this.getservice.getData(this.subOrangeLogic.bind(this)); // get the array of mlab data
  }
  subOrangeLogic(res : string)
  {
    for(var i = 0; i < res.length; i++)
      {
        if(res[i]['name'])
        {
          if(res[i]['name'] == "Orange") // only create elements for the cart if there is no collection associated with this
          {
            this.ids[2] = res[i]['_id'];
            var data ={
              name : res[i]['name'], 
              price : res[i]['price'],
              quantity : res[i]['quantity'] - 1,
              rating : res[i]['rating'],
              comment : res[i]['comment'],
              user : firebase.auth().currentUser.email,
              desc : "",
              coll : "",
              pub : false, 
            }
          }
        }
      }
    this.putservice.updateItem(this.ids[2],data).subscribe(data=>console.log(data));
  }
  
  // create a new html element
  createElement(element,elementId,html)
  {
    let x = document.createElement(element);
    let y = document.createTextNode(html);
    x.setAttribute('id', elementId);
    if(html == "Remove")
    {
      //$("elementId").attr("click","this.removeItem()"); 
    }
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
