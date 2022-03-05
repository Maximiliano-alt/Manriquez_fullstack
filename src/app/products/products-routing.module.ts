import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsComponent } from './pages/home-products/home-products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { DetailProductsComponent } from './pages/detail-products/detail-products.component';
import { CatProductsComponent } from './pages/cat-products/cat-products.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { ModifyCategoryComponent } from './pages/modify-category/modify-category.component';
import { ModifyProductComponent } from './pages/modify-product/modify-product.component';

const routes:Routes=[

  // primera ruta
  {
    path:'',
    children:[
      {
        path:'products-category/:categoria',
        component:HomeProductsComponent,
      },
      {
        path:'add',
        component:AddProductsComponent,
      },
      {
        path:'category',
        component:CatProductsComponent,
      },
       {
        path:'add-category',
        component:CreateCategoryComponent,
      },
      {
        path:'detail/:id',
        component:DetailProductsComponent
      },
      {
        path:'modify/product/:id',
        component:ModifyProductComponent
      },
      {
        path:'modify/category/:id',
        component:ModifyCategoryComponent,
      },

      {
        path:'**',
        redirectTo:'category'
      }
    ]
  }
  

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ProductsRoutingModule { }
