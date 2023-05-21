import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ShopService } from '../shop.service';
import { Brand } from 'src/app/shared/models/brand';
import { Type } from 'src/app/shared/models/type';
import { ShopParams } from 'src/app/shared/models/shop-params';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search')SearchTerms?:ElementRef;
  products:Product[]=[];
  brands:Brand[]=[];
  Types:Type[]=[];
  TotalCount=0;
  TotalPage=0;
  ShopParams:ShopParams = new ShopParams()
  sortOptions=[
    {name:'Alphabitical',value:'name'},
    {name:'Price low to high',value:'priceAsc'},
    {name:'Price high to low',value:'priceDesc'}
  ]
  /**
   *
   */
  constructor(private _shopServices:ShopService) {  }
  ngOnInit(): void {
    this.getProudct();
    this.getBrands();
    this.getTypes();


  }


  private getProudct(){
    this._shopServices.getProudct(this.ShopParams).subscribe({
      next:(res)=>{
        this.products = res.items;
        this.ShopParams.PageNumber = res.pageIndex;
        this.ShopParams.PageSize = res.pageSize;
        this.TotalCount = res.pageSize*res.totalPage;
        this.TotalPage = res.totalPage;

      },
      error:err=>{
        console.log(err);

      }
    })
  }
  private getBrands(){
    this._shopServices.getBrands().subscribe({
      next:(res)=>{
        this.brands = [{id:0,name:"All"},... res];
      },
      error:err=>{
        console.log(err);

      }
    })
  }
  private getTypes()
  {
    this._shopServices.getTypes().subscribe({
      next:(res)=>{
        this.Types = [{id:0,name:"All"},... res];
      },
      error:err=>{
        console.log(err);

      }
    })
  }

  onBrandSelected(BrandId:number){
    this.ShopParams.BrandId = BrandId;
    this.ShopParams.PageNumber = 1;
    this.getProudct();
  }

  onTypeSelected(TypeId:number){
    this.ShopParams.TypeId = TypeId;
    this.ShopParams.PageNumber = 1;
    this.getProudct();
  }
  onSortSelected(event:any){
    this.ShopParams.Sort = event.target.value;
    this.ShopParams.PageNumber = 1;
    this.getProudct();
  }

  onPageChanged(event:any){

    if (this.ShopParams.PageNumber!=event.page) {
      this.ShopParams.PageNumber = event.page;
      this.ShopParams.PageNumber = 1;
      this.getProudct();
    }
  }

  onSearch(){
    this.ShopParams.Search = this.SearchTerms?.nativeElement.value;
    this.ShopParams.PageNumber = 1;
    this.getProudct();
  }
  onReset(){
    if (this.SearchTerms) {
      this.SearchTerms.nativeElement.value="";
      this.ShopParams=new ShopParams();
      this.getProudct();
    }
  }
}
