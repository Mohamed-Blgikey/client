import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagerComponent } from './pager/pager.component';
import { PaginHeaderComponent } from './pagin-header/pagin-header.component'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { BasketSammaryComponent } from './basket-sammary/basket-sammary.component'
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { StepperComponent } from './components/stepper/stepper.component'
import {CdkStepperModule} from '@angular/cdk/stepper'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagerComponent,
    PaginHeaderComponent,
    OrderTotalsComponent,
    BasketSammaryComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    ReactiveFormsModule
  ],
  exports:[
    PaginationModule,
    PagerComponent,
    PaginHeaderComponent,
    CarouselModule,
    OrderTotalsComponent,
    BasketSammaryComponent,
    BsDropdownModule,
    CdkStepperModule,
    StepperComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
