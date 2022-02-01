import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPendientesComponent } from './pages/list-pendientes/list-pendientes.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

	{
		path:'',component: ListPendientesComponent,
	},
	{
		path:'pendientes',component: ListPendientesComponent,

	},
	{
		path: '**',redirectTo:'/pendientes',
	}
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class PendientesRoutingModule { }
