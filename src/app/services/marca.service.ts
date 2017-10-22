import {Injectable} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Marca} from '../marca/marca';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Marca
*/
@Injectable()

export class MarcaService{
	public url:string;

	constructor(public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}

	/*******************************************************************
	RUTAS DE ADMIN
	*******************************************************************/
	/**
	* Obtiene todas las marcas
	*/
	getMarca(){
		return this._authHttp.get(this.url+'admin/mark/getAll/').map(res=>res.json());
	}
	/**
	* Permite agregar nuevas marcas
	*/
	addMarca(marca:Marca){
		return this._authHttp.post(this.url+'admin/mark/save',marca).map(res=>res.json());
	}
	/**
	* Elimina 1 marca
	*/
	deleteMarca(id){
		return this._authHttp.post(this.url+'admin/mark/delete/'+id,'').map(res=>res.json());
	}
}