import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './components/login.component';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,

  ]
})
export class LoginModule { }
