import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { ListVentaComponent } from './pages/list-venta/list-venta.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';


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
