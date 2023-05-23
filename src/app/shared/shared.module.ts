import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagerComponent } from './pager/pager.component';
import { PaginHeaderComponent } from './pagin-header/pagin-header.component'
import { CarouselModule } from 'ngx-bootstrap/carousel'


@NgModule({
  declarations: [
    PagerComponent,
    PaginHeaderComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports:[
    PaginationModule,
    PagerComponent,
    PaginHeaderComponent,
    CarouselModule
  ]
})
export class SharedModule { }
