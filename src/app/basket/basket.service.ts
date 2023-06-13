import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseUrl } from './../shared/models/environment';
import { Injectable } from '@angular/core';
import { Basket, BasketItem, BasketTotal } from '../shared/models/basket-item';
import { Product } from '../shared/models/Product';
import { BusyService } from '../core/services/busy.service';
import { DeliveryMethod } from '../shared/models/DeliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUel:string = BaseUrl;
  private basketSource = new BehaviorSubject<Basket|null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotal|null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private _HttpClient:HttpClient,private loadService:BusyService) { }

  getBasket(id:string){
    this.loadService.busy();
    this._HttpClient.get<BasketItem[]>(`${this.baseUel}Basket?userId=${id}`).subscribe({
      next:res=>{
        if (res.length > 0) {
          let x = {
            Id :res[0].userId,
            items : res
          }
          this.basketSource.next(x as Basket);
          this.calculateTotals()

        }else{
          this.basketSource.next(null);
        }
      }
    })
  }

  addorUpdate(Basket:BasketItem){
    this._HttpClient.post<BasketItem>(`${this.baseUel}Basket`,Basket).subscribe({
      next:(res:BasketItem)=>{
      }
    })
  }

  getCurrentBsketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product , quantity = 1) {
    this.loadService.busy();
    const itemToAdd = this.mapProductItemToBasketItem(item,quantity);
    this._HttpClient.post<BasketItem>(`${this.baseUel}Basket`,itemToAdd).subscribe({
      next:(res:BasketItem)=>{
        this.getBasket("ffa80053-73ae-4ee6-a1fa-866ede17457d");
      }
    })
  }

  private mapProductItemToBasketItem(item: Product,quantity:number):BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: quantity,
      photoUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType,
      userId:"ffa80053-73ae-4ee6-a1fa-866ede17457d"
    }
  }

  private calculateTotals()
  {
    const basket =this.getCurrentBsketValue();
    if(!basket) return;
    const subtotal= basket.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
    const total=subtotal+basket.shippingPrice;
    this.basketTotalSource.next({shipping:basket.shippingPrice,subTotal:subtotal,Total:total});
  }


  deleteBasket(basket:string)
  {
    this.loadService.busy();
    return this._HttpClient.delete(this.baseUel+'Basket?userId='+basket).subscribe({
      next:()=>{
        this.getBasket("ffa80053-73ae-4ee6-a1fa-866ede17457d");
      }
    })
  }

  setShippingPrice(deliveryMethod:DeliveryMethod)
  {
    const basket= this.getCurrentBsketValue();

    if(basket)
    {
      basket.shippingPrice=deliveryMethod.price;
      basket.deliveryMethodId=deliveryMethod.id;
      this.setBasket(basket);
    }
    this.calculateTotals();
  }

  setBasket(basket: Basket) {
    this.basketSource.next(basket);
    this.calculateTotals();
  }

}
