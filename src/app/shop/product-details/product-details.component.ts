import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product?:Product;
  quantity=1;
  quantityInBasket=0;
    constructor(private _shopServices:ShopService,private active:ActivatedRoute) {

    }
  ngOnInit(): void {
    this.loadProduct()
  }

    loadProduct(){
     const id = this.active.snapshot.params['id'];
     this._shopServices.getProudct(id).subscribe({
      next:(res)=>{
        this.product = res;
      },
      error:(err)=>{
        console.log(err);

      }
     })
    }
}
