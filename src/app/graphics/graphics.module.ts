import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { GraphicsRoutingModule } from './graphics-routing.module';
import { HomeGraphicsComponent } from './pages/home-graphics/home-graphics.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ClientGraphicsComponent } from './pages/client-graphics/client-graphics.component';
@NgModule({
  declarations: [
    HomeGraphicsComponent,
    ClientGraphicsComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    SharedModule,
    MaterialModule,
    NgChartsModule
  ]
})
export class GraphicsModule { }
