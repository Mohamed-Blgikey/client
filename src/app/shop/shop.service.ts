import { ShopParams } from '../shared/models/shop-params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paging } from '../shared/models/paging';
import { Product } from '../shared/models/Product';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  BaseUrl:string="https://localhost:44397/api/";
  constructor(private _http:HttpClient) { }

  getProudct(ShopParams:ShopParams):Observable<Paging<Product[]>>{
    let params = new HttpParams();
    if (ShopParams.BrandId>0) params = params.append("BrandId",ShopParams.BrandId);
    if (ShopParams.TypeId>0) params = params.append("TypeId",ShopParams.TypeId);
    if (ShopParams.Search) params = params.append("search",ShopParams.Search);
    params = params.append("pageIndex",ShopParams.PageNumber)
    params = params.append("pageSize",ShopParams.PageSize)
    params = params.append("sort",ShopParams.Sort);

    return this._http.get<Paging<Product[]>>(`${this.BaseUrl}GetProducts`,{params:params});
  }
  getBrands():Observable<Brand[]>{
    return this._http.get<Brand[]>(`${this.BaseUrl}GetProductBrands`);
  }
  getTypes():Observable<Type[]>{
    return this._http.get<Type[]>(`${this.BaseUrl}GetProductTypes`);
  }
}
