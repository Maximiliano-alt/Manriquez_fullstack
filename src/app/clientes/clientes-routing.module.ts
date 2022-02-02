import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ListClientesComponent } from './pages/list-clientes/list-clientes.component';
import { VentasClienteComponent } from './pages/ventas-cliente/ventas-cliente.component';
const routes: Routes=[
  {
    path:'',
    component: ListClientesComponent
  },
  {
    path:'clientes',
    component: ListClientesComponent
  },
  {
    path:'ventasCliente/:id',
    component: VentasClienteComponent,
  },
  {
    path:'**',
    component: ListClientesComponent
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
