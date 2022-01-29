import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    NavbarComponent
    
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  exports:[
    NavbarComponent
  ]
})
export class SharedModule { }
