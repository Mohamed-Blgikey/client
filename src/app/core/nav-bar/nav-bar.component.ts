import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  /**
   *
   */
  Count = 0;
  constructor(public basketService:BasketService) {
    this.basketService.getBasket("ffa80053-73ae-4ee6-a1fa-866ede17457d");
    this.getCount()
  }
  getCount(){
    this.basketService.basketSource$.subscribe({
      next:res=>{
        console.log(res);

        this.Count = res?.reduce((sum,item)=>sum+item.quantity,0)?? 0;
      },
      complete:()=>{
        console.log(this.Count);

      }
    })
  }
}
