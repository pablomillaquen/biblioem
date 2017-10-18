import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './services/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import {DataTableModule} from 'angular2-datatable';
import { NavbarComponent} from './navbar/navbar.component';
import { SidebarComponent} from './sidebar/sidebar.component';

import { EmpleadoComponent} from './empleado/empleado.component';
import { MarcaComponent} from './marca/marca.component';
import { TipoequipoComponent} from './tipoequipo/tipoequipo.component';
import { ModeloComponent} from './modelo/modelo.component';
import { ManualComponent} from './manual/manual.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';
import { TorpedoComponent } from './torpedo/torpedo.component';
import { RepuestoComponent } from './repuesto/repuesto.component';
import { ListmanualComponent } from './listmanual/listmanual.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { DetallemodeloComponent } from './detallemodelo/detallemodelo.component';
import { IndexadminComponent } from './indexadmin/indexadmin.component';
import { MarcaFilterPipe } from './pipes/marca-filter.pipe';
import { ModeloFilterPipe } from './pipes/modelo-filter.pipe';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TipoequipoFilterPipe } from './pipes/tipoequipo-filter.pipe';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    EmpleadoComponent,
    MarcaComponent,
    TipoequipoComponent,
    ModeloComponent,
    ManualComponent,
    ProtocoloComponent,
    TorpedoComponent,
    ListmanualComponent,
    DataFilterPipe,
    DetallemodeloComponent,
    IndexadminComponent,
    MarcaFilterPipe,
    ModeloFilterPipe,
    TipoequipoFilterPipe,
    RepuestoComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    routing,
    DataTableModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AuthModule 
  ],
  providers: [appRoutingProviders,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
