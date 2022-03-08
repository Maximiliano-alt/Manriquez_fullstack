import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListVentaComponent } from './pages/list-venta/list-venta.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { RoutingVentasModule } from './routing-ventas.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { VentaUnicaComponent } from './pages/venta-unica/venta-unica.component';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FilterListVentaPipe } from './pipe/filter-list-venta.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ListVentaComponent,
    AddVentaComponent,
    VentaUnicaComponent,
    ListProductoComponent,
    FilterPipe,
    FilterListVentaPipe,

  ],
  imports: [
    CommonModule,
    RoutingVentasModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
