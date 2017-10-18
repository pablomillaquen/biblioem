import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Empleado } from '../empleado/empleado';
import {GLOBAL} from './global';

@Injectable()

export class EmpleadoService {
	public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	
	//Permite obtener los datos del usuario al hacer  Login
	loginUser(user_to_login, gettoken=null){
		if(gettoken != null){
			user_to_login.gettokken = gettoken;
		}
		return this._http.post(this.url+'admin/auth/autenticar',user_to_login).map(res=>res.json());
	}
}
