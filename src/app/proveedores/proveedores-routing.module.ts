import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProveedoresComponent } from './pages/list-proveedores/list-proveedores.component';
import { NewProveedorComponent } from './pages/new-proveedor/new-proveedor.component';
import { MainComponent } from './pages/main/main.component';
import { ModifyProveedorComponent } from './pages/modify-proveedor/modify-proveedor.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'lista',
        component: ListProveedoresComponent,
      },
      {
        path: 'new',
        component: NewProveedorComponent,
      },
      {
        path: 'modify/:_id',
        component: ModifyProveedorComponent,
      },
      {
        path: '**',
        redirectTo: 'lista',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresRoutingModule {}
