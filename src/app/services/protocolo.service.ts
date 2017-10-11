import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Protocolo} from '../protocolo/protocolo';
import {GLOBAL} from './global';

@Injectable()
export class ProtocoloService {

 public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	getProtocolo(){
		return this._http.get(this.url+'admin/protocolo/getAll/').map(res=>res.json());
	}

	getProtocolo1(id){
		return this._http.get(this.url+'admin/protocolo/get/'+id).map(res=>res.json());	
	}

	getProtocoloxModelo(id){
		return this._http.get(this.url+'admin/protocolo/getxmod/'+id).map(res=>res.json());	
	}

	addProtocolo(protocolo:Protocolo){
		// public id:number,
		// public nombre:string,
		// public fisico:number,
		// public ubicacion:string,
		// public url:string,
		// public mod_id:number
		
		// let json = JSON.stringify(protocolo);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/protocolo/save',protocolo).map(res=>res.json());
		//return this._http.post(this.url+'admin/protocolo/save',params, {headers:headers}).map(res=>res.json());
	}
	
	deleteProtocolo(id){
		// let json = JSON.stringify(protocolo);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/protocolo/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/protocolo/save',params, {headers:headers}).map(res=>res.json());
	}

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
