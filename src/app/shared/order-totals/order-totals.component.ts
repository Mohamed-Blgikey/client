import { BasketService } from 'src/app/basket/basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit{
/**
 *
 */
constructor(public basketService:BasketService) {
}
  ngOnInit(): void {
  }
}
