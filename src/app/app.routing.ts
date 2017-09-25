import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ManualuserComponent} from './manual/manualuser.component';

import { EmpleadoComponent} from './empleado/empleado.component';
import { MarcaComponent} from './marca/marca.component';
import { ModeloComponent} from './modelo/modelo.component';
import { ManualComponent} from './manual/manual.component';
import { BodyappComponent} from './bodyapp/bodyapp.component';
import { ListmanualComponent } from './listmanual/listmanual.component';

const appRoutes: Routes = [
	{path:'', component:ListmanualComponent},
	{path:'bodyapp', component:BodyappComponent},
	{path:'manualuser', component:ListmanualComponent},
	{path:'empleado', component:EmpleadoComponent},
	{path:'marca', component:MarcaComponent},
	{path:'modelo', component:ModeloComponent},
	{path:'manual', component:ManualComponent},
	{path:'**', component:ListmanualComponent}
];

export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);