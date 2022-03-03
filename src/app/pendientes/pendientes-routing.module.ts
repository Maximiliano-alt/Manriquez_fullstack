import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPendientesComponent } from './pages/list-pendientes/list-pendientes.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RouterModule, Routes } from '@angular/router';
import { AddPendientesComponent } from './pages/add-pendientes/add-pendientes.component';

const routes: Routes = [

	{
		path:'',
		children:[
			{
				path:'pendientes',component: ListPendientesComponent,
		
			},
			{
				path:'add',component:AddPendientesComponent,
			},

			{
				path:'preview/:id',component:	PreviewComponent,
			},
			{
				path: '**',redirectTo:'pendientes',
			}
		]
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
