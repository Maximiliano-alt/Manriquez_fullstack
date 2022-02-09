import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
