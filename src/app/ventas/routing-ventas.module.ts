import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { ListVentaComponent } from './pages/list-venta/list-venta.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { VentaUnicaComponent } from './pages/venta-unica/venta-unica.component';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';


const rutas : Routes=[

  { 
    path:'',
    component:ListVentaComponent,
    
  },
  {
    path:'loadVentas',
    component:ListVentaComponent
  },
  {
    path:'addVenta',
    component:AddVentaComponent,
  },
  {
    path:'venta/:id',
    component:VentaUnicaComponent,
  },
  {
    path:'productos/:id',
    component: ListProductoComponent
  },
  {
    path:'**',
    component:ListVentaComponent
  }





]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas),
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingVentasModule { }
