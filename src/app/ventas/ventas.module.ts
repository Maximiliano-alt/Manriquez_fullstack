import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVentaComponent } from './pages/list-venta/list-venta.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { RoutingVentasModule } from './routing-ventas.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { VentaUnicaComponent } from './pages/venta-unica/venta-unica.component';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';

@NgModule({
  declarations: [
    ListVentaComponent,
    AddVentaComponent,
    VentaUnicaComponent,
    ListProductoComponent,
  
  ],
  imports: [
    CommonModule,
    RoutingVentasModule,
    SharedModule,
    MaterialModule
  ]
})
export class VentasModule { }
