import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPendientesComponent } from './pages/list-pendientes/list-pendientes.component';
import { PendientesRoutingModule } from './pendientes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PreviewComponent } from './pages/preview/preview.component';
import { AddPendientesComponent } from './pages/add-pendientes/add-pendientes.component';
import { FormsModule } from '@angular/forms';
import { FilterPendientesPipe } from './pipe/filter-pendientes.pipe';

@NgModule({
  declarations: [
    ListPendientesComponent,
    PreviewComponent,
    AddPendientesComponent,
    FilterPendientesPipe,
    
  ],
  imports: [
    CommonModule,
    PendientesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ]
})
export class PendientesModule { }
