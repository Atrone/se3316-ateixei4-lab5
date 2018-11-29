// imports
import { Component, OnInit } from '@angular/core'
import {GetService} from '../get.service'
import {DeleteService} from '../delete.service' 
import {ItemsComponent} from '../items/items.component'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ids:String[];
  
  // constantly refresh the items in cart with the most up to date values (every 2 seconds) , creates instances of GetService and
  //DeleteService
  constructor(private getservice: GetService, public deleteservice : DeleteService) { 
    setInterval(()=>{
      this.getAllShow();
      console.log();
    },2000) 
  }

  ngOnInit() {
  }
  
  // get all runs on a 2s loop
  getAllShow()
  {
    this.getservice.getData(this.onResponseShow.bind(this)); // get the array of mLab data
  }
  
  // handles logic for removing and re inserting cart's html elements
  onResponseShow(res: string) {
    if(document.getElementById("-1") != null)
      {
        this.removeElement("-1");
      }
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
    this.createElement("H1","-1","Shopping Cart");
    console.log("that just happened");
    for(var i = 0; i < res.length; i++)
    {
      if(!res[i]['coll']) // only create elements for the cart if there is no collection associated with this
      {
        this.createElement("LI",i.toString(),"One order of: " + res[i]['name'] + ", Costing: " + res[i]['price'] + "$ per " + res[i]['name'] 
        + " and a quantity of " + res[i]['quantity'] + " for " + res[i]['user'] + " coming up!");
        this.createElement("BUTTON",(i+1).toString(),"Remove");
        this.createElement("BUTTON",(i+2).toString(),"+");
        this.createElement("BUTTON",(i+3).toString(),"-");
      }
    }
    this.updateTotals(res);
  }
  // buy all items from the cart called by the buy all button
  buyAll() 
  {
    this.getservice.getData(this.buyAllLogic.bind(this)); // get the array of mLab data
  }
  // the logic behind buying all items from cart
  buyAllLogic(res: string)
  {
    if(confirm("Are you sure you want to buy all orders?"))
    {
      console.log(res[1]['name']);
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
      console.log(res[1]['name']);
    }
  }
  // update the total value with the most current value
  updateTotals(res:string)
  {
    var total = 0;
    for(var i = 0; i < res.length; i++)
    {
      total += res[i]['price'];
    }
    document.getElementById('totals').textContent = "TOTAL COMES TO: $" + total.toString();
  }
  
  removeItem()
  {
    //this.deleteservice.deleteItem('5bff35551508714a9ab49eb1').subscribe(data=>console.log(data));
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
