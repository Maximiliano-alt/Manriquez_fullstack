import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaComponent } from './lista/lista.component';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    NavbarComponent,
    ListaComponent
    
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
    
  ],
  exports:[
    NavbarComponent,
    ListaComponent
  ]
})
export class SharedModule { }
