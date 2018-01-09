import { OrderService } from './../../services/order.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  private myCart;
  private list;
  private order = {items:[]};
  private total=0;
  private loader;
  private toast;
  
  constructor(
    private cartService: ShoppingCartService,
    private oService:OrderService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public toastCtrl: ToastController,
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
    this.presentLoading();
    let d = new Date();
    this.order['orderDate'] = d.getHours()+":"+ d.getMinutes() +" "+ d.getDate()+"/"+(d.getMonth()+1);
    
    this.oService.placeOrder(this.order).then(() => {
      this.loader.dismiss();
      this.presentToast();
      this.navCtrl.pop();
    });
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

  presentLoading() {
      this.loader = this.loadingCtrl.create({
      content: "Placing order...",
      duration: 3000
    });
    this.loader.present();
}
presentToast() {
  this.toast = this.toastCtrl.create({
    message: 'Order was added successfully ',
    duration: 3000,
    position: 'bottom'
  });
  this.toast.present();
}
}
