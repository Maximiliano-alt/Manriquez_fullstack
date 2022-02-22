import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HomeProductsComponent } from './pages/home-products/home-products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { DetailProductsComponent } from './pages/detail-products/detail-products.component';
import { CatProductsComponent } from './pages/cat-products/cat-products.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeProductsComponent,
    AddProductsComponent,
    DetailProductsComponent,
    CatProductsComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
