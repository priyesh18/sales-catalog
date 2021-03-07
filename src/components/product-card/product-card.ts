import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Product } from './../../models/product.model';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html'
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  cartItems
  constructor(
    private cartService: ShoppingCartService
  ) {}
  addToCart(product: Product) {
    //console.log(product);
    this.cartService.addToCart(product);
  }
  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }
  show() {
    // console.log(this.cartItems);
  }
  delete(key:string) {
    this.cartService.removeFromCart(key);
  }

}
