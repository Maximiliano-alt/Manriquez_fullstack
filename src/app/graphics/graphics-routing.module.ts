import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGraphicsComponent } from './pages/client-graphics/client-graphics.component';
import { HomeFinanzasComponent } from './pages/home-finanzas/home-finanzas.component';
import { HomeGraphicsComponent } from './pages/home-graphics/home-graphics.component';
import { ProductosGraphicsComponent } from './pages/productos-graphics/productos-graphics/productos-graphics.component';
import { VentasGraphicsComponent } from './pages/ventas-graphics/ventas-graphics.component';

const routes: Routes = [

  {
    path:'',
    children:[
      {
        path:'home',
        component:HomeGraphicsComponent,
      },
      {
        path:'home/finanzas',
        component:HomeFinanzasComponent
      },
      {
        path:'clientes',
        component:ClientGraphicsComponent
      },
      {
        path:'ventas',
        component:VentasGraphicsComponent
      },
      {
        path:'productos',
        component:ProductosGraphicsComponent
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
