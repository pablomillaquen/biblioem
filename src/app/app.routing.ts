import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

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
import { TorpedoComponent } from './torpedo/torpedo.component';
import { RepuestoComponent } from './repuesto/repuesto.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
	{path:'', component:ListmanualComponent},
	{path:'detalle/:id', component:DetallemodeloComponent},
	{path:'bodyapp', component:BodyappComponent},
	{path:'manualuser', component:ListmanualComponent},
	{path:'empleado', component:EmpleadoComponent, canActivate: [AuthGuard]},
	{path:'marca', component:MarcaComponent, canActivate: [AuthGuard]},
	{path:'tipoequipo', component:TipoequipoComponent, canActivate: [AuthGuard]},
	{path:'modelo', component:ModeloComponent, canActivate: [AuthGuard]},
	{path:'manual', component:ManualComponent, canActivate: [AuthGuard]},
	{path:'protocolo', component:ProtocoloComponent, canActivate: [AuthGuard]},
	{path:'torpedo', component:TorpedoComponent, canActivate: [AuthGuard]},
	{path:'repuesto', component:RepuestoComponent, canActivate: [AuthGuard]},
	{path:'indexadmin', component:IndexadminComponent},
	{path:'login', component:LoginComponent},
	{path:'**', component:ListmanualComponent}
];

export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);