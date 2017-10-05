import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Modelo} from '../modelo/modelo';
import {GLOBAL} from './global';

@Injectable()

export class ModeloService{
	public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	getModelo(){
		return this._http.get(this.url+'admin/modelo/getAll/').map(res=>res.json());
	}
	addModelo(modelo:Modelo){
		// let json = JSON.stringify(modelo);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/modelo/save',modelo).map(res=>res.json());
		//return this._http.post(this.url+'admin/modelo/save',params, {headers:headers}).map(res=>res.json());
	}
	
	deleteModelo(id){
		// let json = JSON.stringify(modelo);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/modelo/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/modelo/save',params, {headers:headers}).map(res=>res.json());
	}

	makeFileRequest(url:string, params:Array<string>, files:Array<File>){
		return new Promise((resolve,reject)=>{
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i =0;i<files.length;i++){
				formData.append('uploads[]',files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						//resolve(JSON.parse(xhr.response));
						resolve(xhr.response);
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
