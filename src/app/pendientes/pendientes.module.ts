import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPendientesComponent } from './pages/list-pendientes/list-pendientes.component';
import { PendientesRoutingModule } from './pendientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PreviewComponent } from './pages/preview/preview.component';

@NgModule({
  declarations: [
    ListPendientesComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    PendientesRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class PendientesModule { }
