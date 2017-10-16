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
	getEmpleado(){
		return this._http.get(this.url+'admin/employee/getAll/').map(res=>res.json());
	}
	addEmpleado(empleado:Empleado){
		// let json = JSON.stringify(Empleado);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/employee/save',empleado).map(res=>res.json());
		//return this._http.post(this.url+'admin/employee/save',params, {headers:headers}).map(res=>res.json());
	}

	loginUser(user_to_login, gettoken=null){
		if(gettoken != null){
			user_to_login.gettokken = gettoken;
		}
		return this._http.post(this.url+'admin/auth/autenticar',user_to_login).map(res=>res.json());
	}
	
	deleteEmpleado(id){
		// let json = JSON.stringify(Empleado);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/employee/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/employee/save',params, {headers:headers}).map(res=>res.json());
	}
}
