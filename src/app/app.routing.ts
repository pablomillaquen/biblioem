import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EmpleadoComponent} from '././empleado/empleado.component';

const appRoutes: Routes = [
	{path:'', component:empleadoComponent},
	{path:'empleado', component:empleadoComponent},
	{path:'**', component:empleadoComponent}
];
