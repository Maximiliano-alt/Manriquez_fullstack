import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { HomeGraphicsComponent } from './pages/home-graphics/home-graphics.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    HomeGraphicsComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class GraphicsModule { }
