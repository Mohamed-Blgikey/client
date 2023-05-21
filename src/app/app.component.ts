import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Paging } from './shared/models/paging';
import { Product } from './shared/models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  /**
   *
   */
  Product:Product[]=[];
  constructor(private _http:HttpClient) {  }
  ngOnInit(): void {
    this._http.get<Paging<Product[]>>("https://localhost:44397/api/GetProducts?pagesize=3&pageindex=2").subscribe({
      next:(res)=>{
        this.Product = res.items;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("Complete");

      }
    }
    )
  }
}
