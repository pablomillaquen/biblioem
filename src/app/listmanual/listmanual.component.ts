import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
// import {MarcaService} from '../services/marca.service';
// import {TipoequipoService} from '../services/tipoequipo.service';
import {Modelo} from '../modelo/modelo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

@Component({
  selector: 'app-listmanual',
  templateUrl: './listmanual.component.html',
  styleUrls: ['./listmanual.component.css'],
  providers:[ModeloService]
})
export class ListmanualComponent implements OnInit {
  public modelos:Modelo[];
  //public data: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "nombre";
  public sortOrder = "asc";
  //public articulos;


  constructor(private _modeloService:ModeloService) { }

  ngOnInit(){

    this.obtenerModelos();
  }

  obtenerModelos(){
    this._modeloService.getModelo().subscribe(
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
