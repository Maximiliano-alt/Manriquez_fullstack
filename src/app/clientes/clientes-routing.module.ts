import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ListClientesComponent } from './pages/list-clientes/list-clientes.component';
import { VentasClienteComponent } from './pages/ventas-cliente/ventas-cliente.component';
import { AddClienteComponent } from './pages/add-cliente/add-cliente.component';
import { ListProductVentaComponent } from './pages/list-product-venta/list-product-venta.component';
import { VentaUnicaComponent } from './pages/venta-unica/venta-unica.component';

const routes: Routes=[
  {
    path:'',
    children:[
      {
        path:'clientes',
        component: ListClientesComponent
      },
      {
        path:'ventasCliente/:id',
        component: VentasClienteComponent,
      },
      {
        path:'add/cliente',component:AddClienteComponent
      },
      {
        path:'product/Venta/:rut/:id',component:ListProductVentaComponent
      },
      {
        path:'cliente/venta/:id',component:VentaUnicaComponent
      },
      {
        path:'**',
        redirectTo:'clientes'
      }
    ]
  }
  

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class ClientesRoutingModule { }
