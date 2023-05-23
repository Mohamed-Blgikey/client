import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/Product';
import { Paging } from '../shared/models/paging';
import { ShopParams } from '../shared/models/shop-params';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { BaseUrl } from '../shared/models/environment';
import { BusyService } from '../core/services/busy.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  BaseUrl=BaseUrl;
  constructor(private _http:HttpClient,private loadService:BusyService) { }

  getProudcts(ShopParams:ShopParams):Observable<Paging<Product[]>>{
    let params = new HttpParams();
    if (ShopParams.BrandId>0) params = params.append("BrandId",ShopParams.BrandId);
    if (ShopParams.TypeId>0) params = params.append("TypeId",ShopParams.TypeId);
    if (ShopParams.Search) params = params.append("search",ShopParams.Search);
    params = params.append("pageIndex",ShopParams.PageNumber)
    params = params.append("pageSize",ShopParams.PageSize)
    params = params.append("sort",ShopParams.Sort);
    this.loadService.busy()

    return this._http.get<Paging<Product[]>>(`${this.BaseUrl}GetProducts`,{params:params});
  }
  getBrands():Observable<Brand[]>{
    this.loadService.busy()
    return this._http.get<Brand[]>(`${this.BaseUrl}GetProductBrands`);
  }
  getTypes():Observable<Type[]>{
    this.loadService.busy()
    return this._http.get<Type[]>(`${this.BaseUrl}GetProductTypes`);
  }
  getProudct(id:number):Observable<Product>{
    this.loadService.busy()
    return this._http.get<Product>(`${this.BaseUrl}GetProduct/${id}`);
  }
}
