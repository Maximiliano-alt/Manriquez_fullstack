import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';


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
    path: 'proveedores', loadChildren:()=>import('./proveedores/proveedores.module').then(modulo=> modulo.ProveedoresModule)
    ,canActivate:[AuthGuard],canLoad:[AuthGuard]
  },
  {
    path:'app',loadChildren:()=> import('./home/home.module').then(modulo =>modulo.HomeModule)
    ,canActivate:[AuthGuard],canLoad:[AuthGuard]
  },
  {
    path:'ventas',loadChildren:()=> import('./ventas/ventas.module').then(modulo => modulo.VentasModule)
    ,canActivate:[AuthGuard],canLoad:[AuthGuard]
  },
   {
    path:'pendientes',loadChildren:()=> import('./pendientes/pendientes.module').then(modulo => modulo.PendientesModule)
    ,canActivate:[AuthGuard],canLoad:[AuthGuard]
  },
 {
    path:'clientes',loadChildren:()=> import('./clientes/clientes.module').then(modulo => modulo.ClientesModule)
    ,canActivate:[AuthGuard],canLoad:[AuthGuard]
  },
  {
    path:'productos',loadChildren:()=> import('./products/products.module').then(modulo=>modulo.ProductsModule)
    ,canActivate:[AuthGuard],canLoad:[AuthGuard]
  },
  {
    path:'estadisticas',loadChildren:()=>import('./graphics/graphics.module').then(m=>m.GraphicsModule)
    ,canActivate:[AuthGuard],canLoad:[AuthGuard]
  },
  {
    // para rutas inexistentes redirecciona hacia auth
    path:'**',redirectTo:'/app',pathMatch:"full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
