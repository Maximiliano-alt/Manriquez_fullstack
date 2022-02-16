import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/components/login.component';
import { RegisterComponent } from './pages/register/components/register.component';
const routes: Routes = [

{
  path:'',
  children:[
    {
      path:'',
      redirectTo:'login',
    },
    {
      path:'login',
      component: LoginComponent,
    },
    {
      path:'register',
      component: RegisterComponent,
    },
    {
      path: '**',
      redirectTo: 'login'
    }
  ]
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
