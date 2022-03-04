import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaComponent } from './lista/lista.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FilterProveedoresPipe } from '../proveedores/pipe/filter-proveedores.pipe';
@NgModule({
  declarations: [
    NavbarComponent,
    ListaComponent,
    FilterProveedoresPipe
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    ListaComponent,
    FilterProveedoresPipe
  ]
})
export class SharedModule { }
