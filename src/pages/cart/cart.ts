import { OrderService } from './../../services/order.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { HttpClient } from '@angular/common/http/';
import { HttpHeaders } from '@angular/common/http';

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
  private uname:string;
  
  constructor(
    private cartService: ShoppingCartService,
    private oService:OrderService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private auth:AuthService) {
  }

  ionViewWillEnter() {
    this.myCart = this.cartService.getCart();
    this.auth.appUser$.subscribe(user => {
      this.uname = user.name;
      this.order['userName'] = user.name;
    }
    )
    this.list = Object.keys(this.myCart);
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
    if(this.total === 0) {
      this.presentToast('Add Items to cart!');
      return;
    }
    this.presentLoading();
    let d = new Date();
    this.order['orderDate'] = d.getHours()+":"+ d.getMinutes() +" "+ d.getDate()+"/"+(d.getMonth()+1);
    
    this.oService.placeOrder(this.order).then(() => {
      this.sendNotification()
      this.loader.dismiss();
      this.presentToast('Order was added successfully ');
      this.navCtrl.pop();
      this.order = {items:[]}
    });
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
presentToast(msg) {
  this.toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });
  this.toast.present();
}
sendNotification() {
  let body = {
    "notification":{
      "title":"New Order Arrived",
      "body":"New Order From "+this.uname,
      "sound":"default",
      "click_action":"FCM_PLUGIN_ACTIVITY",
      "icon":"fcm_push_icon"
    },
    "data":{
      "param1":"value1",
      "param2":"value2"
    },
      "to":"/topics/all",
      "priority":"high",
      "restricted_package_name":""
  }
  let options = new HttpHeaders().set('Content-Type','application/json');
  this.http.post("https://fcm.googleapis.com/fcm/send",body,{
    headers: options.set('Authorization', 'key=AIzaSyAai1Xlpgqt5XpbVNV4j-Z_h-JaoKjavxk'),
  })
    .subscribe();
}
}
