import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './shared/models/Product';
import { Paging } from './shared/models/paging';

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
  constructor(private _http:HttpClient,private _BasketService:BasketService,private _AccountService:AccountService) {  }
  ngOnInit(): void {
    if (localStorage.getItem("token") !=null) {
      this._AccountService.loadCurrentUser(localStorage.getItem("token")).subscribe();
    }

  }
}
