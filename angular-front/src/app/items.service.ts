import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  
  fruitPrices : int[] = [5,6,3];
  fruitStock : int[] = [50,50,50];
  constructor() { }
  
  confirmSelection()
  {
    
  }
}
