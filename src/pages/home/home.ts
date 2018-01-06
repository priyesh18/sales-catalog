import { CartPage } from './../cart/cart';
import { Product } from './../../models/product.model';
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { ProductService } from '../../services/product.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  private allProducts: Product[] = [];
  private filteredProducts: Product[] = [];
  private searchProducts: Product[] = [];
  private anotherP: Product[];
  constructor(
    public navCtrl: NavController,
    private productService: ProductService,
    private events: Events
  ) {

  }
  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = products;
      //this.anotherP = products;
    })
    this.events.subscribe('shareObject', (companys,types,subtypes) => {
      this.onSearch(companys,types,subtypes);
  });  
  }
  onSearch(companys,types,subtypes) {
    this.filteredProducts=[];
    companys.forEach(company => {
        types.forEach(type => {
            subtypes.forEach(subtype => {
              this.filter2(company+type+subtype);
            });
        });
    });
  }
  filter(val: any) {

    this.filteredProducts = (val) ?
      this.filteredProducts.filter(p => p.search.toLowerCase().includes(val.toLowerCase())) :
      this.anotherP || this.allProducts;

}
filter2(val) {
  this.searchProducts = (val) ?
      this.allProducts.filter(p => p.search.toLowerCase().includes(val.toLowerCase())) :
      this.allProducts;
    this.filteredProducts.push(...this.searchProducts);
    this.anotherP = this.filteredProducts;
}
goToCart() {
  this.navCtrl.push(CartPage);
}

}
