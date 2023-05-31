import { BasketService } from 'src/app/basket/basket.service';
import { Component } from '@angular/core';
import { BasketItem } from 'src/app/shared/models/basket-item';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  /**
   *
   */
  constructor(public basketService:BasketService) {
  }
  incrementQuantity(item:BasketItem)
  {
    item.quantity ++;
    let product={
      id :item.id,
      name:item.productName,
      productBrand:item.brand,
      pictureUrl:item.photoUrl,
      price:item.price,
      productType:item.type
    } as Product;
     this.basketService.addItemToBasket(product,item.quantity);
  }

  removeItem(item:any)
  {
    item.quantity --;
    let product={
      id :item.id,
      name:item.productName,
      productBrand:item.brand,
      pictureUrl:item.photoUrl,
      price:item.price,
      productType:item.type
    } as Product;
     this.basketService.addItemToBasket(product,item.quantity);
  }

}
