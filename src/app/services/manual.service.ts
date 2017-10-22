import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Manual} from '../manual/manual';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Manual
*/
@Injectable()
export class ManualService {
public url:string;

	constructor(public _http:Http, public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}

	/*******************************************************************
	RUTAS DE USUARIO
	*******************************************************************/
	/*
	*Obtiene los manuales disponibles para un modelo específico
	*/
	userGetManualxModelo(id){
		return this._http.get(this.url+'user/manual/getxmod/'+id).map(res=>res.json());	
	}


	/*******************************************************************
	RUTAS DE ADMIN
	*******************************************************************/
	/**
	* Obtiene todos los manuales
	*/
	getManual(){
		return this._authHttp.get(this.url+'admin/manual/getAll/').map(res=>res.json());
	}

	/**
	*Obtiene 1 manual en específico de acuerdo a la ID
	*/
	getManual1(id){
		return this._authHttp.get(this.url+'admin/manual/get/'+id).map(res=>res.json());	
	}

	/**
	*Obtiene los manuales disponibles para un modelo específico
	*/
	getManualxModelo(id){
		return this._authHttp.get(this.url+'admin/manual/getxmod/'+id).map(res=>res.json());	
	}
	/**
	* Permite agregar un manual
	*/
	addManual(manual:Manual){
		return this._authHttp.post(this.url+'admin/manual/save',manual).map(res=>res.json());
	}
	/**
	* Permite eliminar un manual
	*/
	deleteManual(id){
		return this._authHttp.post(this.url+'admin/manual/delete/'+id,'').map(res=>res.json());
	}

	/**
	* Permite subir un archivo a la carpeta /uploads/manuales/ existente dentro de la carpeta de la API
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
