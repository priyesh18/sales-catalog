import { CategoryService } from './../../services/category.service';
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

  allCompanies = [];
  allTypes = ['steel','glass'];
  allSubtypes = ['single','double','triple','four'];
  constructor(
    public navCtrl: NavController,
    private productService: ProductService,
    private categoryService: CategoryService,
    private events: Events
  ) {

  }
  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = products;
      //this.anotherP = products;
    });
    this.categoryService.getAll().subscribe((data) => {
      this.allCompanies = data.map(comp => comp.$key);
    })
    this.events.subscribe('shareObject', (companys,types,subtypes) => {
      this.onSearch(companys,types,subtypes);
  });  
  }
  onSearch(companys:string[],types,subtypes) {
    if(companys.length == 0 ) companys = this.allCompanies;
    if(types.length == 0 ) types = this.allTypes;
    if(subtypes.length == 0 ) subtypes = this.allSubtypes;
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
