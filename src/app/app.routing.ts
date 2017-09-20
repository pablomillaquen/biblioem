import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { EmpleadoComponent} from './empleado/empleado.component';
import { MarcaComponent} from './marca/marca.component';
import { ModeloComponent} from './modelo/modelo.component';
import { BodyappComponent} from './bodyapp/bodyapp.component';

const appRoutes: Routes = [
	{path:'', component:BodyappComponent},
	{path:'bodyapp', component:BodyappComponent},
	{path:'empleado', component:EmpleadoComponent},
	{path:'marca', component:MarcaComponent},
	{path:'modelo', component:ModeloComponent},
	{path:'**', component:BodyappComponent}
];

export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);