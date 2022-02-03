import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientesComponent } from './pages/list-clientes/list-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { VentasClienteComponent } from './pages/ventas-cliente/ventas-cliente.component';

@NgModule({
  declarations: [
    ListClientesComponent,
    VentasClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ClientesModule { }
