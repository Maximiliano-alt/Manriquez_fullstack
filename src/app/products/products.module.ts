import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HomeProductsComponent } from './pages/home-products/home-products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { DetailProductsComponent } from './pages/detail-products/detail-products.component';
@NgModule({
  declarations: [
    HomeProductsComponent,
    AddProductsComponent,
    DetailProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
