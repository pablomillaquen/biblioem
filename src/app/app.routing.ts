import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { EmpleadoComponent} from './empleado/empleado.component';

const appRoutes: Routes = [
	{path:'', component:EmpleadoComponent},
	{path:'empleado', component:EmpleadoComponent},
	{path:'**', component:EmpleadoComponent}
];
