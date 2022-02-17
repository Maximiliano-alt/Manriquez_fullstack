import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { NewProveedorComponent } from './pages/new-proveedor/new-proveedor.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    ProveedoresComponent,
    NewProveedorComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ProveedoresModule { }
