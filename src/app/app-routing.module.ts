import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';


const routes: Routes = [
  //aca dentro de todas las rutas path

  {path:'', redirectTo:'/login',pathMatch:'full'},//para ruta vacia
  {path:'login',component: LoginComponent},
  {path:'create/User',component: CreateUserComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
