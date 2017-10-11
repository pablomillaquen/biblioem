import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Manual} from '../manual/manual';
import {GLOBAL} from './global';

@Injectable()
export class ManualService {
public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	getManual(){
		return this._http.get(this.url+'admin/manual/getAll/').map(res=>res.json());
	}

	getManual1(id){
		return this._http.get(this.url+'admin/manual/get/'+id).map(res=>res.json());	
	}

	getManualxModelo(id){
		return this._http.get(this.url+'admin/manual/getxmod/'+id).map(res=>res.json());	
	}

	addManual(manual:Manual){
		// public id:number,
		// public nombre:string,
		// public fisico:number,
		// public ubicacion:string,
		// public url:string,
		// public mod_id:number
		
		// let json = JSON.stringify(manual);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/manual/save',manual).map(res=>res.json());
		//return this._http.post(this.url+'admin/manual/save',params, {headers:headers}).map(res=>res.json());
	}
	
	deleteManual(id){
		// let json = JSON.stringify(manual);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/manual/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/manual/save',params, {headers:headers}).map(res=>res.json());
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
