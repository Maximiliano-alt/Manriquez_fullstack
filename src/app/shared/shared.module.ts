import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { ListaComponent } from './lista/lista.component';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    NavbarComponent,
    ListaComponent
    
=======
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent

>>>>>>> 5f8fa155c8be2eab6474acb5fe394a479996a4d0
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
<<<<<<< HEAD
    MaterialModule
    
=======
    RouterModule
>>>>>>> 5f8fa155c8be2eab6474acb5fe394a479996a4d0
  ],
  exports:[
    NavbarComponent,
    ListaComponent
  ]
})
export class SharedModule { }
