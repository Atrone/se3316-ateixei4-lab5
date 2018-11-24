import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
  }
  
  postFruit(name:String,price:number,tax:number,quantity:number){
    var data ={
      name : (<HTMLInputElement>document.getElementById('name')).value,
      price : (<HTMLInputElement>document.getElementById('price')).value,
      tax : (<HTMLInputElement>document.getElementById('tax')).value,
      quantity : (<HTMLInputElement>document.getElementById('quantity')).value,
    }
    this.postService.postData(data).subscribe((response)=>{
      console.log(response);
    });

  }

}
