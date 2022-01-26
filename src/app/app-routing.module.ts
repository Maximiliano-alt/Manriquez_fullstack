import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';



const routes: Routes = [
  //para ruta vacia
  //aca dentro de todas las rutas path
  {
    path:'auth',loadChildren: ()=> import('./auth/auth.module').then(modulo => modulo.AuthModule)},
  {
    path:'**',redirectTo:'auth'// falta ruta 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
