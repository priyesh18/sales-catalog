import { Product } from './../../models/product.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html'
})
export class ProductCardComponent {
  @Input('product') product: Product;

  constructor() {
   
  }
  addToCart(product: Product) {
    
  }

}
