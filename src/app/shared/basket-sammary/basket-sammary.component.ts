import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../models/basket-item';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-sammary',
  templateUrl: './basket-sammary.component.html',
  styleUrls: ['./basket-sammary.component.scss']
})
export class BasketSammaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<{id:number,quantity:number}>();

  @Input() isBasket!:boolean;
   constructor(public basketService:BasketService) { }


   addBasketItem(item:BasketItem)
   {
     this.addItem.emit(item);
   }

   removeBasketItem(item:BasketItem)
   {
     this.removeItem.emit(item);
   }

}
