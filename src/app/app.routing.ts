import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ManualuserComponent} from './manual/manualuser.component';

import { EmpleadoComponent} from './empleado/empleado.component';
import { MarcaComponent} from './marca/marca.component';
import { ModeloComponent} from './modelo/modelo.component';
import { ManualComponent} from './manual/manual.component';
import { TipoequipoComponent} from './tipoequipo/tipoequipo.component';
import { BodyappComponent} from './bodyapp/bodyapp.component';
import { ListmanualComponent } from './listmanual/listmanual.component';
import { IndexadminComponent } from './indexadmin/indexadmin.component';
import { DetallemodeloComponent } from './detallemodelo/detallemodelo.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';

const appRoutes: Routes = [
	{path:'', component:ListmanualComponent},
	{path:'detalle/:id', component:DetallemodeloComponent},
	{path:'bodyapp', component:BodyappComponent},
	{path:'manualuser', component:ListmanualComponent},
	{path:'empleado', component:EmpleadoComponent},
	{path:'marca', component:MarcaComponent},
	{path:'tipoequipo', component:TipoequipoComponent},
	{path:'modelo', component:ModeloComponent},
	{path:'manual', component:ManualComponent},
	{path:'protocolo', component:ProtocoloComponent},
	{path:'indexadmin', component:IndexadminComponent},
	{path:'**', component:ListmanualComponent}
];

export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);