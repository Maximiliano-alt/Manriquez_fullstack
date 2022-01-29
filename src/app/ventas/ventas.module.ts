import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVentaComponent } from './pages/list-venta/list-venta.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { RoutingVentasModule } from './routing-ventas.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ListVentaComponent,
    AddVentaComponent,
  ],
  imports: [
    CommonModule,
    RoutingVentasModule,
    SharedModule,
    MaterialModule
  ]
})
export class VentasModule { }
