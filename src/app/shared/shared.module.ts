import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagerComponent } from './pager/pager.component';
import { PaginHeaderComponent } from './pagin-header/pagin-header.component'


@NgModule({
  declarations: [
    PagerComponent,
    PaginHeaderComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports:[
    PaginationModule,
    PagerComponent,
    PaginHeaderComponent
  ]
})
export class SharedModule { }
