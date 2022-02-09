import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsComponent } from './pages/home-products/home-products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { DetailProductsComponent } from './pages/detail-products/detail-products.component';


const routes:Routes=[

  // primera ruta
  {
    path:'',
    children:[
      {
        path:'home-productos',
        component:HomeProductsComponent,
      },
      {
        path:'add',
        component:AddProductsComponent,
      },
      {
        path:'detail/:id',
        component:DetailProductsComponent
      },
      {
        path:'**',
        redirectTo:'home-productos'
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
