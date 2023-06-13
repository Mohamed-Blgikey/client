import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutServiceService } from '../checkout-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket-item';
import { OrderToCreate } from 'src/app/shared/models/Order';
import { Address } from 'src/app/shared/models/user';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?:FormGroup;
  @Input() clientSecret?:string;
  @ViewChild('cardNumber') cardNumberElement?:ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?:ElementRef;
  @ViewChild('cardCvc') cardCvcElement?:ElementRef;

  stripe:Stripe|null=null;
  cardNumber?:StripeCardNumberElement;
  cardExpiry?:StripeCardExpiryElement;
  cardCvc?:StripeCardCvcElement;

  cardErrors:any;




  constructor(
            private checkoutService:CheckoutServiceService,
            private router:Router,
            private basketService:BasketService) { }

  ngOnInit(): void {

    loadStripe('pk_test_51NFFEkHJ1iE8Yj3IeOyYyLsQBSw6Z8lwpEhJ2Mtt1eEjrc6rm8T13vEGdZTthRDYooB70nVl9MDQv1RLepcMoqqE00ZP4RXb8Z').then(stripe=>{
      this.stripe=stripe;
      const elements=stripe?.elements();
      if(elements)
      {
        this.cardNumber=elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change',event=>{
          if(event.error)this.cardErrors=event.error.message
          else this.cardErrors=null
        })

        this.cardExpiry=elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change',event=>{
          console.log(this.cardNumber);

          if(event.error)this.cardErrors=event.error.message
          else this.cardErrors=null
        })

        this.cardCvc=elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change',event=>{
          if(event.error)this.cardErrors=event.error.message
          else this.cardErrors=null
        })
      }
    })
  }


  async submitOrder()
  {

    console.log(this.clientSecret);
    this.confirmPaymentWithStripe();



  }


  confirmPaymentWithStripe() {
      this.stripe?.confirmCardPayment(this.clientSecret!,{
        payment_method:{
          card:this.cardNumber!,
          billing_details:{
            name:this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
          }
        }
      }).then(res=>{
        console.log(res);
        if (res.error) {
          alert(res.error.message)
        }  else{
          alert(res.paymentIntent.description)
        }
      });
  }


}
