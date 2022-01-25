import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';



const routes: Routes = [
  //aca dentro de todas las rutas path

  {path:'', redirectTo:'/login',pathMatch:'full'},//para ruta vacia
  {path:'login',component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
