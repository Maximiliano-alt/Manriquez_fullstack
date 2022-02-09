import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPendientesComponent } from './pages/list-pendientes/list-pendientes.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

	{
		path:'',
		children:[
			{
				path:'pendientes',component: ListPendientesComponent,
		
			},
			{
				path:'preview',component:	PreviewComponent,
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
