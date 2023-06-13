export interface BasketItem {
   id:number;
   productName:string;
   price:number;
   quantity:number;
   photoUrl:string;
   brand:string;
   type :string;
   userId:string;
}

export interface Basket{
  Id:string;
  items:BasketItem[];
  clientSecret?:string;
    paymentIntentId?:string;
    deliveryMethodId?:number;
    shippingPrice:number;
}

export interface BasketTotal{
  shipping:number;
  subTotal:number;
  Total:number;
}
// export class Basket implements Basket{
//   Id: string = "101";
//   items: BasketItem[] =[];
// }
