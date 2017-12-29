import { NgModule } from '@angular/core';
import { ProductCartComponent } from './product-cart/product-cart';
import { ProductCardComponent } from './product-card/product-card';
@NgModule({
	declarations: [ProductCartComponent,
    ProductCardComponent],
	imports: [],
	exports: [ProductCartComponent,
    ProductCardComponent]
})
export class ComponentsModule {}
