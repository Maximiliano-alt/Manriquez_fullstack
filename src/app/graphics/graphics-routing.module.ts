import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGraphicsComponent } from './pages/client-graphics/client-graphics.component';
import { HomeGraphicsComponent } from './pages/home-graphics/home-graphics.component';

const routes: Routes = [

  {
    path:'',
    children:[
      {
        path:'home',
        component:HomeGraphicsComponent,
      },
      {
        path:'clientes',
        component:ClientGraphicsComponent
      },
      {
        path:'**',
        redirectTo:'home'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphicsRoutingModule { }
