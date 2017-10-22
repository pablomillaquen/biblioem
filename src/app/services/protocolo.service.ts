import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Protocolo} from '../protocolo/protocolo';
import {GLOBAL} from './global';

/**
* Servicio que se comunica con la API para obtener y enviar información de la clase Protocolo
*/
@Injectable()
export class ProtocoloService {

 public url:string;

	constructor(public _http:Http, public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}


	/*********************************************************************
	RUTAS DE USUARIO
	*********************************************************************/
	/**
	* Obtiene los protocolos asociados a 1 modelo
	*/
	userGetProtocoloxModelo(id){
		return this._http.get(this.url+'user/protocolo/getxmod/'+id).map(res=>res.json());	
	}



	/*********************************************************************
	RUTAS DE ADMIN
	*********************************************************************/
	/**
	* Obtiene todos los protocolos existentes
	*/
	getProtocolo(){
		return this._authHttp.get(this.url+'admin/protocolo/getAll/').map(res=>res.json());
	}

	/**
	* Obtiene 1 protocolo
	*/
	getProtocolo1(id){
		return this._authHttp.get(this.url+'admin/protocolo/get/'+id).map(res=>res.json());	
	}

	/**
	* Obtiene todos los protocolos asociados a 1 modelo
	*/
	getProtocoloxModelo(id){
		return this._authHttp.get(this.url+'admin/protocolo/getxmod/'+id).map(res=>res.json());	
	}

	/**
	* Agrega 1 protocolo
	*/
	addProtocolo(protocolo:Protocolo){
		return this._authHttp.post(this.url+'admin/protocolo/save',protocolo).map(res=>res.json());
	}
	
	/**
	* Elimina 1 protocolo
	*/
	deleteProtocolo(id){
		return this._authHttp.post(this.url+'admin/protocolo/delete/'+id,'').map(res=>res.json());
	}

	/**
	* Agrega 1 archivo para el protocolo que se está agregando
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
