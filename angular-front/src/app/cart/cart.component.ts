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
  constructor(private getservice: GetService, private deleteservice : DeleteService) { 
    setInterval(()=>{
      this.getAllShow();
      console.log()
    },2000)
  }

  ngOnInit() {
  }

  getAllShow()
  {
    this.getservice.getData(this.onResponseShow.bind(this));
  }
  
  onResponseShow(res: string) {
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
      this.createElement("LI",i.toString(),"One order of: " + res[i]['name'] + ", Costing: " + res[i]['price'] + "$ per " + res[i]['name'] 
      + " and a quantity of " + res[i]['quantity'] + " for " + res[i]['user'] + " coming up!");
      this.createElement("BUTTON",(i+1).toString(),"Remove");
      this.createElement("BUTTON",(i+2).toString(),"+");
      this.createElement("BUTTON",(i+3).toString(),"-");
    }
    this.updateTotals(res);
  }
  buyAll() 
  {
    this.getservice.getData(this.buyAllLogic.bind(this));
  }
  buyAllLogic(res: string)
  {
    if(confirm("Are you sure you want to buy all orders?"))
    {
      console.log(res[1]['name']);
    }
  }
  removeAll()
  {
    this.getservice.getData(this.removeAllLogic.bind(this));
  }
  removeAllLogic(res: string)
  {
    if(confirm("Are you sure you want to delete all orders?"))
    {
      console.log(res[1]['name']);
    }
  }
  updateTotals(res:string)
  {
    var total = 0;
    for(var i = 0; i < res.length; i++)
    {
      total += res[i]['price'];
    }
    document.getElementById('totals').textContent = "TOTAL COMES TO: $" + total.toString();
  }
  
  createElement(element,elementId,html)
  {
    let x = document.createElement(element);
    let y = document.createTextNode(html);
    x.setAttribute('id', elementId);
    x.appendChild(y);
    document.body.appendChild(x);
    x.addEventListener("click",function(){
      if(html == "Remove")
      {
        console.log("removeHere" + elementId);
        this.deleteservice.deleteItem('5bfccf8c14b2a6fe92553c7d').subscribe(data=>console.log(data));
      }
      else if(html == "+")
      {
        console.log("addHere" + elementId);
      }
      else if(html == "-")
      {
        console.log("subHere" + elementId);
      }
    });
  }
  // removes an element
  removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }

}
