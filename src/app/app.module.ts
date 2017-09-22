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
import { ModeloComponent} from './modelo/modelo.component';
import { ManualComponent} from './manual/manual.component';
import { ListmanualComponent } from './listmanual/listmanual.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    BodyappComponent,
    ManualuserComponent,
    EmpleadoComponent,
    MarcaComponent,
    ModeloComponent,
    ManualComponent,
    ListmanualComponent,
    DataFilterPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    routing,
    DataTableModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
