import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Repuesto} from '../repuesto/repuesto';
import {RepuestoModelo} from '../repuesto/repuestomodelo';
import {GLOBAL} from './global';

@Injectable()
export class RepuestoService {
	public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	getRepuesto(){
		return this._http.get(this.url+'admin/repuesto/getAll/').map(res=>res.json());
	}

	getRepuesto1(id){
		return this._http.get(this.url+'admin/repuesto/get/'+id).map(res=>res.json());	
	}

	getRepuestoxModelo(id){
		return this._http.get(this.url+'admin/repuesto/getxmod/'+id).map(res=>res.json());	
	}

	addRepuesto(repuesto:Repuesto){
		// let json = JSON.stringify(repuesto);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/repuesto/save',repuesto).map(res=>res.json());
		//return this._http.post(this.url+'admin/repuesto/save',params, {headers:headers}).map(res=>res.json());
	}
	
	addRepuestoxmod(repuestoxmod:RepuestoModelo){
		return this._http.post(this.url+'admin/repuesto/savexmod',repuestoxmod).map(res=>res.json());
	}

	deleteRepuesto(id){
		// let json = JSON.stringify(repuesto);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/repuesto/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/repuesto/save',params, {headers:headers}).map(res=>res.json());
	}

	deleteRepuestoxMod(id, idRepuesto){
		// let json = JSON.stringify(repuesto);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/repuesto/deletexmod/'+id+'/'+idRepuesto,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/repuesto/save',params, {headers:headers}).map(res=>res.json());
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
