import { BaseUrl } from 'src/app/shared/models/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethod } from '../shared/models/DeliveryMethod';
import { map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {
  baseUrl=BaseUrl;
  constructor(private http:HttpClient) { }

  getDeliveryMethods()
  {
    return this.http.get<DeliveryMethod[]>(this.baseUrl +'orders/deliveryMethod').pipe(
      map(dm=>{
        return dm.sort((a,b)=>b.price -a.price)
      })
    )
  }

  createOrder(order:OrderToCreate)
  {
   return this.http.post<Order>(this.baseUrl +'Orders',order);
  }

  CreatePymentIntient(id:number){
    return this.http.post<Order>(this.baseUrl+`Payments/${id}`,{})
  }
}
