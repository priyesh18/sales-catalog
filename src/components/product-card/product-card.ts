import { Component } from '@angular/core';

/**
 * Generated class for the ProductCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html'
})
export class ProductCardComponent {

  text: string;

  constructor() {
    console.log('Hello ProductCardComponent Component');
    this.text = 'Hello World';
  }

}
