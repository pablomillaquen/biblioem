import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Empleado } from '../empleado/empleado';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Empleado
*/
@Injectable()

export class EmpleadoService {
	public url:string;
	public empleado:Empleado;

	constructor(public _http:Http, public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
		this.empleado = new Empleado(0,'','','',0,'','');
	}


	/*********************************************************************
	RUTAS DE USUARIO
	*********************************************************************/

	/**
	* Permite obtener los datos del usuario al hacer  Login
	*/
	loginUser(user_to_login, gettoken=null){
		if(gettoken != null){
			user_to_login.gettokken = gettoken;
		}
		return this._http.post(this.url+'admin/auth/autenticar',user_to_login).map(res=>res.json());
	}


	/*********************************************************************
	RUTAS DE ADMIN
	*********************************************************************/
	/**
	* Obtiene todos los empleados
	*/
	getEmpleado(){
		return this._authHttp.get(this.url+'admin/employee/getAll/').map(res=>res.json());
	}

	/**
	* Permite agregar un empleado
	*/
	addEmpleado(empleado:Empleado){
		return this._authHttp.post(this.url+'admin/employee/save',empleado).map(res=>res.json());
	}

	/**
	* Borra un empleado
	*/
	deleteEmpleado(id){
		return this._authHttp.post(this.url+'admin/employee/delete/'+id,'').map(res=>res.json());
	}
}
