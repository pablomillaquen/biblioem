import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Torpedo} from '../torpedo/torpedo';
import {GLOBAL} from './global';


@Injectable()
export class TorpedoService {

	public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	getTorpedo(){
		return this._http.get(this.url+'admin/torpedo/getAll/').map(res=>res.json());
	}

	getTorpedo1(id){
		return this._http.get(this.url+'admin/torpedo/get/'+id).map(res=>res.json());	
	}

	getTorpedoxModelo(id){
		return this._http.get(this.url+'admin/torpedo/getxmod/'+id).map(res=>res.json());	
	}

	addTorpedo(torpedo:Torpedo){
		// public id:number,
		// public nombre:string,
		// public fisico:number,
		// public ubicacion:string,
		// public url:string,
		// public mod_id:number
		
		// let json = JSON.stringify(torpedo);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/torpedo/save',torpedo).map(res=>res.json());
		//return this._http.post(this.url+'admin/torpedo/save',params, {headers:headers}).map(res=>res.json());
	}
	
	deleteTorpedo(id){
		// let json = JSON.stringify(torpedo);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/torpedo/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/torpedo/save',params, {headers:headers}).map(res=>res.json());
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

