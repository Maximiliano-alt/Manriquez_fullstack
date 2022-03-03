import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ListProveedoresComponent } from './pages/list-proveedores/list-proveedores.component';
import { NewProveedorComponent } from './pages/new-proveedor/new-proveedor.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListProveedoresComponent,
    NewProveedorComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProveedoresModule { }
