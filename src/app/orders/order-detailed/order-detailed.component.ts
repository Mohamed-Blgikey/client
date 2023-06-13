import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order?:any;
    constructor(private orderService:OrdersService,private route:ActivatedRoute) { }

    ngOnInit(): void {
      const id= this.route.snapshot.paramMap.get('id');
      id&&this.orderService.getOrderDetails(+id).subscribe({
        next:order=>{
          this.order=order;
          console.log(this.order)
        }
      })
    }

}
