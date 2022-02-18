import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { GraphicsRoutingModule } from './graphics-routing.module';
import { HomeGraphicsComponent } from './pages/home-graphics/home-graphics.component';
import { FormsModule } from '@angular/forms';
//angular
import {MatDatepickerModule} from '@angular/material/datepicker';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ClientGraphicsComponent } from './pages/client-graphics/client-graphics.component';
import { VentasGraphicsComponent } from './pages/ventas-graphics/ventas-graphics.component';
import { ProductosGraphicsComponent } from './pages/productos-graphics/productos-graphics/productos-graphics.component';
@NgModule({
  declarations: [
    HomeGraphicsComponent,
    ClientGraphicsComponent,
    VentasGraphicsComponent,
    ProductosGraphicsComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    SharedModule,
    MaterialModule,
    NgChartsModule,
    MatDatepickerModule,
    FormsModule
  ]
})
export class GraphicsModule { }
