import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Repuesto} from '../repuesto/repuesto';
import {RepuestoModelo} from '../repuesto/repuestomodelo';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Repuesto
*/
@Injectable()
export class RepuestoService {
	public url:string;

	constructor(public _http:Http, public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}


	/**********************************************************************
	RUTAS DE USUARIO
	**********************************************************************/
	
	/**
	* Obtiene los repuestos existentes para determinado modelo
	*/
	userGetRepuestoxModelo(id){
		return this._http.get(this.url+'user/repuesto/getxmod/'+id).map(res=>res.json());	
	}

	/**********************************************************************
	RUTAS DE ADMIN
	**********************************************************************/
	
	/**
	* Obtiene todos los repuestos existentes
	*/
	getRepuesto(){
		return this._authHttp.get(this.url+'admin/repuesto/getAll/').map(res=>res.json());
	}

	/**
	* Obtiene 1 repuesto
	*/
	getRepuesto1(id){
		return this._authHttp.get(this.url+'admin/repuesto/get/'+id).map(res=>res.json());	
	}

	/**
	* Obtiene los repuestos asociados a 1 modelo
	*/
	getRepuestoxModelo(id){
		return this._authHttp.get(this.url+'admin/repuesto/getxmod/'+id).map(res=>res.json());	
	}

	/**
	* Agrega 1 repuesto
	*/
	addRepuesto(repuesto:Repuesto){
		return this._authHttp.post(this.url+'admin/repuesto/save',repuesto).map(res=>res.json());
	}
	
	/**
	* Agrega 1 repuesto por modelo
	*/	
	addRepuestoxmod(repuestoxmod:RepuestoModelo){
		return this._authHttp.post(this.url+'admin/repuesto/savexmod',repuestoxmod).map(res=>res.json());
	}

	/**
	* Elimina 1 repuesto
	*/
	deleteRepuesto(id){
		return this._authHttp.post(this.url+'admin/repuesto/delete/'+id,'').map(res=>res.json());
	}

	/**
	* Elimina 1 repuesto para el modelo seleccionado
	*/
	deleteRepuestoxMod(id, idRepuesto){
		return this._authHttp.post(this.url+'admin/repuesto/deletexmod/'+id+'/'+idRepuesto,'').map(res=>res.json());
	}

	/**
	* Agrega un archivo (foto) para el repuesto que se desea agregar
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
