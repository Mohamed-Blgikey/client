import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutServiceService } from '../checkout-service.service';
import { Basket } from 'src/app/shared/models/basket-item';
import { OrderToCreate } from 'src/app/shared/models/Order';
import { FormGroup } from '@angular/forms';
import { Address } from 'src/app/shared/models/user';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() checkoutForm?:FormGroup;
  @Input() appStepper?:CdkStepper;
  @Output() paymentIntentId = new EventEmitter<string>();
   constructor(private basketService:BasketService,private CheckoutService:CheckoutServiceService) { }

   ngOnInit(): void {
   }

   async createPaymentIntent()
   {
    const basket=this.basketService.getCurrentBsketValue();
    if(!basket) throw new Error('Cannot get the basket');
    try {
      const createdOrder= await this.createOrder(basket);
      console.log(createdOrder);
        this.CheckoutService.createOrder(createdOrder).subscribe((res)=>{
          console.log(res);
          this.CheckoutService.CreatePymentIntient(res.id).subscribe({
            next:(order)=>{
             console.log(order);
              this.paymentIntentId.emit(order.clientSecret)
              this.appStepper?.next();
            },
            error:err=>{
             console.log(err);

            }
          })
          this.basketService.getBasket("ffa80053-73ae-4ee6-a1fa-866ede17457d");

        });
    } catch (error:any) {
    }


   }


   private async createOrder(basket: Basket | null) {
    if(!basket) throw new Error('basket is null');
    const orderToCreate= this.getOrderToCreate(basket);
    return orderToCreate;
  }

  private getOrderToCreate(basket:Basket):OrderToCreate
  {
    const deliveryMethodId=this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shippToAddress= this.checkoutForm?.get('addressForm')?.value as Address;

    if(!deliveryMethodId || !shippToAddress) throw new Error('Problem with basket');

    return {
      userId:basket.Id,
      deliveryMethodId:deliveryMethodId,
      shipToAddress:shippToAddress

    }
  }
}
