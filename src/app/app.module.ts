import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import {DataTableModule} from 'angular2-datatable';
import { NavbarComponent} from './navbar/navbar.component';
import { SidebarComponent} from './sidebar/sidebar.component';
import { BodyappComponent} from './bodyapp/bodyapp.component';
import { ManualuserComponent} from './manual/manualuser.component';

import { EmpleadoComponent} from './empleado/empleado.component';
import { MarcaComponent} from './marca/marca.component';
import { TipoequipoComponent} from './tipoequipo/tipoequipo.component';
import { ModeloComponent} from './modelo/modelo.component';
import { ManualComponent} from './manual/manual.component';
import { ListmanualComponent } from './listmanual/listmanual.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { DetallemodeloComponent } from './detallemodelo/detallemodelo.component';
import { IndexadminComponent } from './indexadmin/indexadmin.component';
import { MarcaFilterPipe } from './pipes/marca-filter.pipe';
import { ModeloFilterPipe } from './pipes/modelo-filter.pipe';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TipoequipoFilterPipe } from './pipes/tipoequipo-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    BodyappComponent,
    ManualuserComponent,
    EmpleadoComponent,
    MarcaComponent,
    TipoequipoComponent,
    ModeloComponent,
    ManualComponent,
    ListmanualComponent,
    DataFilterPipe,
    DetallemodeloComponent,
    IndexadminComponent,
    MarcaFilterPipe,
    ModeloFilterPipe,
    TipoequipoFilterPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    routing,
    DataTableModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
