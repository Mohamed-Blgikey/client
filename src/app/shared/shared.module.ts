import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagerComponent } from './pager/pager.component';
import { PaginHeaderComponent } from './pagin-header/pagin-header.component'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { BasketSammaryComponent } from './basket-sammary/basket-sammary.component'
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'

@NgModule({
  declarations: [
    PagerComponent,
    PaginHeaderComponent,
    OrderTotalsComponent,
    BasketSammaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot()

  ],
  exports:[
    PaginationModule,
    PagerComponent,
    PaginHeaderComponent,
    CarouselModule,
    OrderTotalsComponent,
    BasketSammaryComponent,
    BsDropdownModule
  ]
})
export class SharedModule { }
