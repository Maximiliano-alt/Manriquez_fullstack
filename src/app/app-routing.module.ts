import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  //para ruta vacia
  //aca dentro de todas las rutas path
  {
    // para rutas vacias renderea a auth
    path:'',redirectTo:'auth',pathMatch:"full"
  },
  {
    // al momento de renderear auth renderea a sus childrens
    path:'auth',loadChildren: ()=> import('./auth/auth.module').then(modulo => modulo.AuthModule)
  },
  {
    path:'app',loadChildren:()=> import('./home/home.module').then(modulo =>modulo.HomeModule)
  },
  {
    path:'ventas',loadChildren:()=> import('./ventas/ventas.module').then(modulo => modulo.VentasModule)
  },
   {
    path:'pendientes',loadChildren:()=> import('./pendientes/pendientes.module').then(modulo => modulo.PendientesModule)
  },
 {
    path:'clientes',loadChildren:()=> import('./clientes/clientes.module').then(modulo => modulo.ClientesModule)
  },
  {
    path:'productos',loadChildren:()=> import('./products/products.module').then(modulo=>modulo.ProductsModule)
  },
  {
    path:'estadisticas',loadChildren:()=>import('./graphics/graphics.module').then(m=>m.GraphicsModule)
  },
  {
    // para rutas inexistentes redirecciona hacia auth
    path:'**',redirectTo:'/auth',pathMatch:"full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
