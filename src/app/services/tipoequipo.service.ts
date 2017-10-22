import {Injectable} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Tipoequipo
*/
@Injectable()

export class TipoequipoService{
	public url:string;

	constructor(public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}

	/*********************************************************************
	RUTAS DE ADMIN
	*********************************************************************/

	/**
	* Obtiene todos los tipos de equipos
	*/
	getTipoEquipo(){
		return this._authHttp.get(this.url+'admin/type/getAll/').map(res=>res.json());
	}

	/**
	* Agrega 1 tipo de equipo
	*/
	addTipoEquipo(tipoequipo:Tipoequipo){
		return this._authHttp.post(this.url+'admin/type/save',tipoequipo).map(res=>res.json());
		
	}
	
	/**
	* Borra 1 tipo de equipo
	*/
	deleteTipoEquipo(id){
		return this._authHttp.post(this.url+'admin/type/delete/'+id,'').map(res=>res.json());
	}
}