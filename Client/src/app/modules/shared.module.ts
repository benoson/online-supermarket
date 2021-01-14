import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../components/product/product.component';
import { ProductsPipe } from '../pipes/products.pipe';

// This modules is dedicated for shared components / pipes and more shared pieces of the project

@NgModule({
  declarations: [
    ProductComponent,
    ProductsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductComponent,
    ProductsPipe
  ]
})
export class SharedModule { }
