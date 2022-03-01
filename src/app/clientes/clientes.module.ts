import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientesComponent } from './pages/list-clientes/list-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { VentasClienteComponent } from './pages/ventas-cliente/ventas-cliente.component';
import { AddClienteComponent } from './pages/add-cliente/add-cliente.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ListProductVentaComponent } from './pages/list-product-venta/list-product-venta.component';
import { VentaUnicaComponent } from './pages/venta-unica/venta-unica.component';
@NgModule({
  declarations: [
    ListClientesComponent,
    VentasClienteComponent,
    AddClienteComponent,
    ListProductVentaComponent,
    VentaUnicaComponent
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
