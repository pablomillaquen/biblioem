import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Modelo} from '../modelo/modelo';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Modelo
*/
@Injectable()

export class ModeloService{
	public url:string;

	constructor(public _http:Http, public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}
	
	
	/******************************************************************************
	//RUTAS DE USUARIO
	******************************************************************************/
	/**
	* Obtiene todos los modelos existentes
	*/
	userGetModelo(){
		return this._http.get(this.url+'user/modelo/getAll/').map(res=>res.json());
	}

	/**
	* Obtiene 1 modelo
	*/
	userGetModelo1(id){
		return this._http.get(this.url+'user/modelo/get/'+id).map(res=>res.json());	
	}
	



	/******************************************************************************
	//RUTAS DE ADMIN
	******************************************************************************/
	/**
	* Obtiene todos los modelos existentes
	*/
	getModelo(){
		return this._authHttp.get(this.url+'admin/modelo/getAll/').map(res=>res.json());
	}

	/**
	* Obtiene 1 modelo
	*/
	getModelo1(id){
		return this._authHttp.get(this.url+'admin/modelo/get/'+id).map(res=>res.json());	
	}

	/**
	* Agrega 1 modelo
	*/
	addModelo(modelo:Modelo){
		return this._authHttp.post(this.url+'admin/modelo/save',modelo).map(res=>res.json());
	}
	
	/**
	* Elimina 1 modelo
	*/
	deleteModelo(id){
		return this._authHttp.post(this.url+'admin/modelo/delete/'+id,'').map(res=>res.json());
	}

	/**
	* Sube 1 archivo (foto) para el modelo seleccionado. 
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
