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
import { FilterCategoryPipe } from './pipe/filter-category.pipe';
import { FilterProductPipe } from './pipe/filter-product.pipe';
import { ModifyCategoryComponent } from './pages/modify-category/modify-category.component';
import { ModifyProductComponent } from './pages/modify-product/modify-product.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
@NgModule({
  declarations: [
    HomeProductsComponent,
    AddProductsComponent,
    DetailProductsComponent,
    CatProductsComponent,
    CreateCategoryComponent,
    FilterCategoryPipe,
    FilterProductPipe,
    ModifyCategoryComponent,
    ModifyProductComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AlifeFileToBase64Module
  ]
})
export class ProductsModule { }
