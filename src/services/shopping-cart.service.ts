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
        this.cart[product.$key] = product;
        this.cart[product.$key]['quantity'] = 1;
    }
    removeFromCart(key: string) {
        delete this.cart[key];
    }
}