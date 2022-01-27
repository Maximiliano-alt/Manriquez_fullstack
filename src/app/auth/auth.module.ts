import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

// peticiones http
import { HttpClientModule } from '@angular/common/http';//hacer peticiones de tipo http al back

// Componentes de nuestro modulo
import { RegisterComponent } from './pages/register/components/register.component';
import { LoginComponent } from './pages/login/components/login.component';

// Componentes extras
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class AuthModule { }
