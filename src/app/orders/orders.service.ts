import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../shared/models/environment';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl= BaseUrl;
  constructor(private http:HttpClient) { }

  getOrdersForUser()
  {
    return this.http.get<Order[]>(this.baseUrl+'orders');
  }

  getOrderDetails(id:number)
  {
    return this.http.get<Order>(this.baseUrl+'orders/'+id);
  }
}
