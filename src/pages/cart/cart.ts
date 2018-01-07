import { OrderService } from './../../services/order.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  private myCart;
  private list;
  private order = {items:[]};
  private total=0;
  
  constructor(
    private cartService: ShoppingCartService,
    private oService:OrderService,
    private auth:AuthService) {
  }

  ionViewWillEnter() {
    this.myCart = this.cartService.getCart();
    //console.log(this.myCart);
    this.auth.appUser$.subscribe(user => {
      
      this.order['userName'] = user.name;
    }
    )
    this.list = Object.keys(this.myCart);
    //console.log(this.list);
    this.list.forEach(item => { 
      this.order.items.push ({ 
          id: this.myCart[item].id,
          price: this.myCart[item].price,
          quantity: this.myCart[item].quantity,
          notes: ""
 
      })
      
    });
    this.calcTotal();
     
    
  }
  onPlaceOrder() {
    let d = new Date();
    this.order['orderDate'] = d.getHours()+":"+ d.getMinutes() +" "+ d.getDate()+"/"+(d.getMonth()+1);
    
    //this.oService.placeOrder(this.order);
    console.log(this.order);
  }
  
  onChange(val) {
    this.calcTotal();
  }
  
  calcTotal() {
    this.total = 0;
    this.list.forEach(item => {
      this.total += this.myCart[item].price*this.myCart[item].quantity; 
      
    });
    
    this.order['company']="";
    this.order['total'] = this.total;
  }

}
