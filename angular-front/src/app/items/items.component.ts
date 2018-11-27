import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service'
import {GetService} from '../get.service'
import {ItemsService} from '../items.service'
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  fruitPrices : int[] = [5,6,3];
  fruitStock : int[] = [5,5,5];
  SM:boolean = false;
  AppleComments:String;
  PearComments:String;
  OrangeComments:String;
  
  constructor(private postService: PostService, private getService: GetService) { 
    setInterval(()=>{
      this.sortByRatings();
      console.log(firebase.auth().currentUser.email);
    },2000)
  }

  ngOnInit() {
  }
  
  sortByRatings()
  {
    this.getService.getData(this.sortByRatingsLogic.bind(this));
  }
  sortByRatingsLogic(res: string) {
    this.AppleComments = "";
    this.PearComments = "";
    this.OrangeComments = "";
    var fruitTotalRatings = [0,0,0];
    var fruitTimesRated = [0,0,0];
    var fruitAvgRatings = [0,0,0];
    for(var i = 0; i < res.length; i++)
    {
      if(res[i]['name'] == "Apple")
      {
        fruitTimesRated[0] += 1;
        fruitTotalRatings[0] += res[i]['rating'];
        this.AppleComments += (res[i]['comment']) + "~~";
      }
      if(res[i]['name'] == "Pear")
      {
        fruitTimesRated[1] += 1;
        fruitTotalRatings[1] += res[i]['rating'];
        this.PearComments += (res[i]['comment']) + "~~";
      }
      if(res[i]['name'] == "Orange")
      {
        fruitTimesRated[2] += 1;
        fruitTotalRatings[2] += res[i]['rating'];
        this.OrangeComments += (res[i]['comment']) + "~~";
      }
    }
    var fruitAvgRatings=[fruitTotalRatings[0]/fruitTimesRated[0],fruitTotalRatings[1]/fruitTimesRated[1],
    fruitTotalRatings[2]/fruitTimesRated[2]];
    for(var i = 0; i < 3; i++)
    {
      document.getElementById('Rating' + i.toString()).textContent = fruitAvgRatings[i].toString();
    }
    this.sortByRatingsHTML(fruitAvgRatings);
  }
  

  
  sortByRatingsHTML(ratings)
  {
    var first = "";
    var second = "";
    var third = "";
    console.log(ratings);
    if(ratings[0] > ratings[1])
    {
      if(ratings[0] > ratings[2])
      {
        first = "Apple";
      }
    }
    if(ratings[1] > ratings[0])
    {
      if(ratings[1] > ratings[2])
      {
        first = "Pear";
      }
    }
    if(ratings[2] > ratings[1])
    {
      if(ratings[2] > ratings[0])
      {
        first = "Orange";
      }
    }
    if(ratings[0] < ratings[1])
    {
      if(ratings[0] < ratings[2])
      {
        third = "Apple";
      }
    }
    if(ratings[1] < ratings[0])
    {
      if(ratings[1] < ratings[2])
      {
        third = "Pear";
      }
    }
    if(ratings[2] < ratings[1])
    {
      if(ratings[2] < ratings[0])
      {
        third = "Orange";
      }
    }
    if((first == "Apple" && third == "Pear") || (third == "Apple" && first == "Pear"))
    {
      second = "Orange";
    }
    if((first == "Pear" && third == "Orange") || (third == "Pear" && first == "Orange"))
    {
      second = "Apple";
    }
    if((first == "Apple" && third == "Orange") || (third == "Apple" && first == "Orange"))
    {
      second = "Pear";
    }
    
    for (var i = 1; i < 3; i++) {
		var tmp = ratings[i]; //Copy of the current element. 
		/*Check through the sorted part and compare with the number in tmp. If large, shift the number*/
		for (var j = i - 1; j >= 0 && (ratings[j] > tmp); j--) {
			//Shift the number
			ratings[j + 1] = ratings[j];
		}
		  //Insert the copied number at the correct position
		  //in sorted part. 
		  ratings[j + 1] = tmp;
	  }
    
    console.log(ratings);
    if(first == "Apple")
    {
      document.getElementById('Name0').textContent = "Apple";
      document.getElementById('Image0').src = "http://www.themonitordaily.com/wp-content/uploads/2015/03/aplle.jpg";
      document.getElementById('Price0').textContent = "5";
      document.getElementById('Quantity0').textContent = this.fruitStock[0].toString();
      document.getElementById('Desc0').textContent = "This is a Apple";
      document.getElementById('Rating0').textContent = ratings[2].toString();
      document.getElementById('Comments0').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.AppleComments.split("~~")[i])
        {
          document.getElementById('Comments0').textContent += this.AppleComments.split("~~")[i] + "||";
        }
      }
    }
    if(first == "Pear")
    {
      document.getElementById('Name0').textContent = "Pear";
      document.getElementById('Image0').src = "https://www.buyfruit.com.au/images/P/Paradise-Pears__74461.jpg";
      document.getElementById('Price0').textContent = "6";
      document.getElementById('Quantity0').textContent = this.fruitStock[1].toString();
      document.getElementById('Desc0').textContent = "This is a Pear";
      document.getElementById('Rating0').textContent = ratings[2].toString();
      document.getElementById('Comments0').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.PearComments.split("~~")[i])
        {
          document.getElementById('Comments0').textContent += this.PearComments.split("~~")[i] + "||";
        }
      }
    }
    if(first == "Orange") 
    {
      document.getElementById('Name0').textContent = "Orange";
      document.getElementById('Image0').src = "https://www.thermofisher.com/blog/wp-content/uploads/2014/11/orange_citrus_fruit_isolated.jpg";
      document.getElementById('Price0').textContent = "3";
      document.getElementById('Quantity0').textContent = this.fruitStock[2].toString();
      document.getElementById('Desc0').textContent = "This is a Orange";
      document.getElementById('Rating0').textContent = ratings[2].toString();
      document.getElementById('Comments0').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.OrangeComments.split("~~")[i])
        {
          document.getElementById('Comments0').textContent += this.OrangeComments.split("~~")[i] + "||";
        }
      }
    }
    if(second == "Apple")
    {
      document.getElementById('Name1').textContent = "Apple";
      document.getElementById('Image1').src = "http://www.themonitordaily.com/wp-content/uploads/2015/03/aplle.jpg";
      document.getElementById('Price1').textContent = "5";
      document.getElementById('Quantity1').textContent = this.fruitStock[0].toString();
      document.getElementById('Desc1').textContent = "This is a Apple";
      document.getElementById('Rating1').textContent = ratings[1].toString();
      document.getElementById('Comments1').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.AppleComments.split("~~")[i])
        {
          document.getElementById('Comments1').textContent += this.AppleComments.split("~~")[i] + "||";
        }
      }
    }
    if(second == "Pear")
    {
      document.getElementById('Name1').textContent = "Pear";
      document.getElementById('Image1').src = "https://www.buyfruit.com.au/images/P/Paradise-Pears__74461.jpg";
      document.getElementById('Price1').textContent = "6";
      document.getElementById('Quantity1').textContent = this.fruitStock[1].toString();
      document.getElementById('Desc1').textContent = "This is a Pear";
      document.getElementById('Rating1').textContent = ratings[1].toString();
      document.getElementById('Comments1').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.PearComments.split("~~")[i])
        {
          document.getElementById('Comments1').textContent += this.PearComments.split("~~")[i] + "||";
        }
      }
    }
    if(second == "Orange")
    {
      document.getElementById('Name1').textContent = "Orange";
      document.getElementById('Image1').src = "https://www.thermofisher.com/blog/wp-content/uploads/2014/11/orange_citrus_fruit_isolated.jpg";
      document.getElementById('Price1').textContent = "3";
      document.getElementById('Quantity1').textContent = this.fruitStock[2].toString();
      document.getElementById('Desc1').textContent = "This is a Orange";
      document.getElementById('Rating1').textContent = ratings[1].toString();
      document.getElementById('Comments1').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.OrangeComments.split("~~")[i])
        {
          document.getElementById('Comments1').textContent += this.OrangeComments.split("~~")[i] + "||";
        }
      }
    }
    if(third == "Apple")
    {
      document.getElementById('Name2').textContent = "Apple";
      document.getElementById('Image2').src = "http://www.themonitordaily.com/wp-content/uploads/2015/03/aplle.jpg";
      document.getElementById('Price2').textContent = "5";
      document.getElementById('Quantity2').textContent = this.fruitStock[0].toString();
      document.getElementById('Desc2').textContent = "This is a Apple";
      document.getElementById('Rating2').textContent = ratings[0].toString();
      document.getElementById('Comments2').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.AppleComments.split("~~")[i])
        {
          document.getElementById('Comments2').textContent += this.AppleComments.split("~~")[i] + "||";
        }
      }
    }
    if(third == "Pear")
    {
      document.getElementById('Name2').textContent = "Pear";
      document.getElementById('Image2').src = "https://www.buyfruit.com.au/images/P/Paradise-Pears__74461.jpg";
      document.getElementById('Price2').textContent = "6";
      document.getElementById('Quantity2').textContent = this.fruitStock[1].toString();
      document.getElementById('Desc2').textContent = "This is a Pear";
      document.getElementById('Rating2').textContent = ratings[0].toString();
      document.getElementById('Comments2').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.PearComments.split("~~")[i])
        {
          document.getElementById('Comments2').textContent += this.PearComments.split("~~")[i] + "||";
        }
      }
    }
    if(third == "Orange")
    {
      document.getElementById('Name2').textContent = "Orange";
      document.getElementById('Image2').src = "https://www.thermofisher.com/blog/wp-content/uploads/2014/11/orange_citrus_fruit_isolated.jpg";
      document.getElementById('Price2').textContent = "3";
      document.getElementById('Quantity2').textContent = this.fruitStock[2].toString();
      document.getElementById('Desc2').textContent = "This is a Orange";
      document.getElementById('Rating2').textContent = ratings[0].toString();
      document.getElementById('Comments2').textContent = " ";
      for(var i = 0; i < 5; i++)
      {
        if(this.OrangeComments.split("~~")[i])
        {
          document.getElementById('Comments2').textContent += this.OrangeComments.split("~~")[i] + "||";
        }
      }
    }
    if(parseInt(document.getElementById('Quantity0').textContent) <= 0)
      {
        this.removeElement('Name0');
        this.removeElement('Image0');
        this.removeElement('Price0');
        this.removeElement('Quantity0');
        this.removeElement('Desc0');
        this.removeElement('Rating0');
        this.removeElement('Comments0');
        this.removeElement('ShowPrice0');
        this.removeElement('ShowRating0');
        this.removeElement('ShowComments0');
        this.removeElement('QuantityInput0');
        this.removeElement('RatingInput0');
        this.removeElement('CommentInput0');
        this.removeElement('AskQuantity0');
        this.removeElement('AskRating0');
        this.removeElement('AskComment0');
      }
    if(parseInt(document.getElementById('Quantity1').textContent) <= 0)
      {
        this.removeElement('Name1');
        this.removeElement('Image1');
        this.removeElement('Price1');
        this.removeElement('Quantity1');
        this.removeElement('Desc1');
        this.removeElement('Rating1');
        this.removeElement('Comments1');
        this.removeElement('ShowPrice1');
        this.removeElement('ShowRating1');
        this.removeElement('ShowComments1');
        this.removeElement('QuantityInput1');
        this.removeElement('RatingInput1');
        this.removeElement('CommentInput1');
        this.removeElement('AskQuantity1');
        this.removeElement('AskRating1');
        this.removeElement('AskComment1');
      }
      if(parseInt(document.getElementById('Quantity2').textContent) <= 0)
      {
        this.removeElement('Name2');
        this.removeElement('Image2');
        this.removeElement('Price2');
        this.removeElement('Quantity2');
        this.removeElement('Desc2');
        this.removeElement('Rating2');
        this.removeElement('Comments2');
        this.removeElement('ShowPrice2');
        this.removeElement('ShowRating2');
        this.removeElement('ShowComments2');
        this.removeElement('QuantityInput2');
        this.removeElement('RatingInput2');
        this.removeElement('CommentInput2');
        this.removeElement('AskQuantity2');
        this.removeElement('AskRating2');
        this.removeElement('AskComment2'); 
      }
      
    console.log(first);
    console.log(second);
    console.log(third);
    console.log(this.PearComments.split("~~")[0]);
    console.log(this.AppleComments);
    console.log(this.PearComments);
  }
  
  removeElement(elementId) 
  {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }
  
  showMore()
  {
    this.SM = true;
  }
  buy() 
  {
    console.log("hey")
    for(var i = 0; i < 3; i++)
    {
      console.log(parseInt((<HTMLInputElement>document.getElementById('RatingInput'+ i.toString())).value));
      console.log(parseInt((<HTMLInputElement>document.getElementById('QuantityInput'+ i.toString())).value));
      console.log(((<HTMLInputElement>document.getElementById('CommentInput'+ i.toString())).value));

      if(parseInt((<HTMLInputElement>document.getElementById('RatingInput'+ i.toString())).value) && 
      parseInt((<HTMLInputElement>document.getElementById('QuantityInput'+ i.toString())).value) && 
      ((<HTMLInputElement>document.getElementById('CommentInput'+ i.toString())).value))
      {
        console.log("hooray");
        var data ={
          name : (document.getElementById("Name" + i.toString()).textContent), 
          price : parseInt((document.getElementById("Price" + i.toString()).textContent)),
          quantity : parseInt((<HTMLInputElement>document.getElementById('QuantityInput'+ i.toString())).value),
          rating : parseInt((<HTMLInputElement>document.getElementById('RatingInput'+ i.toString())).value),
          comment : "COMMENT:" + (<HTMLInputElement>document.getElementById("CommentInput" + i.toString()).value).toString() + " RATING:" + 
          (<HTMLInputElement>document.getElementById('RatingInput'+ i.toString())).value + " USER:" + firebase.auth().currentUser.email, 
        }
        this.postService.postData(data).subscribe((response)=>{
          console.log(response);
        });
        if((document.getElementById("Name" + i.toString()).textContent) == "Apple")
        {
          this.fruitStock[0] -= parseInt((<HTMLInputElement>document.getElementById('QuantityInput'+ i.toString())).value);
          console.log(this.fruitStock[0]);
        }
        else if((document.getElementById("Name" + i.toString()).textContent) == "Pear")
        {
          this.fruitStock[1] -= parseInt((<HTMLInputElement>document.getElementById('QuantityInput'+ i.toString())).value);
          console.log(this.fruitStock[1]);
        }
        else if((document.getElementById("Name" + i.toString()).textContent) == "Orange")
        {
          this.fruitStock[2] -= parseInt((<HTMLInputElement>document.getElementById('QuantityInput'+ i.toString())).value);
          console.log(this.fruitStock[2]);
        }
      }
    }
  }
}
