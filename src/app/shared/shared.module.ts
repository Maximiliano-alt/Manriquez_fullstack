import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaComponent } from './lista/lista.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import {FiltroVentaPipe} from './pipes/filtro_venta.pipe'

@NgModule({
  declarations: [
    NavbarComponent,
    ListaComponent,
    FiltroVentaPipe
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
    ListaComponent
  ]
})
export class SharedModule { }
