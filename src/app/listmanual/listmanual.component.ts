//Librerías varias
import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
declare var jQuery:any;

//Servicios
import {ModeloService} from '../services/modelo.service';
import { GLOBAL } from '../services/global';

//Modelos de datos
import {Modelo} from '../modelo/modelo';

/**
* Página principal de la aplicación. Presenta la lista con los datos de los modelos existentes en la base de datos.
* A partir de ahí, el usuario puede buscar y ver la información técnica existente para ese modelo en particular.
*/
@Component({
  selector: 'app-listmanual',
  templateUrl: './listmanual.component.html',
  providers:[ModeloService]
})


export class ListmanualComponent {
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "nombre";
  public sortOrder = "asc";
  
  public modelos:Modelo[];


  constructor(private _modeloService:ModeloService) { }

  /**
  * Ejecuta las funciones necesarias al llamar al componente
  */
  ngOnInit(){
    this.obtenerModelos();
  }

  /**
  * Obtiene los datos de los modelos, desde la API, haciendo uso de la API.
  */
  obtenerModelos(){
    this._modeloService.userGetModelo().subscribe(
      result=>{  
        this.modelos= result.result;
        console.log(result);
        },
      error=>{
        console.log(<any>error);
        }
      );
  }


}
