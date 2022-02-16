import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientesComponent } from './pages/list-clientes/list-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { VentasClienteComponent } from './pages/ventas-cliente/ventas-cliente.component';
import { AddClienteComponent } from './pages/add-cliente/add-cliente.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ListClientesComponent,
    VentasClienteComponent,
    AddClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
