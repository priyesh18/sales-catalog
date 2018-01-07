//import { Cart } from './../models/cart.model';
import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
    private cart = {};
    getCart() {
        return this.cart;
    }
    addToCart(product: Product) {
        //console.log(this.cart[product.$key]);
        this.cart[product.$key] = product;
        this.cart[product.$key]['quantity'] = 1;
        //console.log(this.cart[product.$key]);
        console.log(this.cart);
    }
    removeFromCart(key: string) {
        delete this.cart[key];
        console.log(this.cart);
    }
}