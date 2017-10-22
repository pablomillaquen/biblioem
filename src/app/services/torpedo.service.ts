import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Torpedo} from '../torpedo/torpedo';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Torpedo
*/
@Injectable()
export class TorpedoService {

	public url:string;

	constructor(public _http:Http, public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}

	/*********************************************************************
	RUTAS DE USUARIO
	*********************************************************************/


	/**
	* Obtiene los apuntes para el modelo seleccionado
	*/
	userGetTorpedoxModelo(id){
		return this._http.get(this.url+'user/torpedo/getxmod/'+id).map(res=>res.json());	
	}

	/*********************************************************************
	RUTAS DE ADMIN
	*********************************************************************/

	/**
	* Obtiene todos los apuntes
	*/
	getTorpedo(){
		return this._authHttp.get(this.url+'admin/torpedo/getAll/').map(res=>res.json());
	}
	/**
	* Obtiene 1 de los apuntes
	*/
	getTorpedo1(id){
		return this._authHttp.get(this.url+'admin/torpedo/get/'+id).map(res=>res.json());	
	}
	/**
	* Obtiene los apuntes para el modelo seleccionado
	*/
	getTorpedoxModelo(id){
		return this._authHttp.get(this.url+'admin/torpedo/getxmod/'+id).map(res=>res.json());	
	}
	/**
	* Agrega 1 apunte
	*/
	addTorpedo(torpedo:Torpedo){
		return this._authHttp.post(this.url+'admin/torpedo/save',torpedo).map(res=>res.json());
	}
	/**
	* Borra 1 apunte
	*/
	deleteTorpedo(id){
		return this._authHttp.post(this.url+'admin/torpedo/delete/'+id,'').map(res=>res.json());
	}

	/**
	* Agrega un archivo al apunte que se está guardando
	*/
	makeFileRequest(url:string, params:Array<string>, files:Array<File>){
		return new Promise((resolve,reject)=>{
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i =0;i<files.length;i++){
				formData.append('uploads',files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
						//resolve(xhr.response);
					}else{
						reject(xhr.response);
					}
				}
			};
			xhr.open("POST", url, true);
			xhr.send(formData);
		})
	}
}

