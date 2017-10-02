import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Marca} from '../marca/marca';
import {GLOBAL} from './global';

@Injectable()

export class MarcaService{
	public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	getMarca(){
		return this._http.get(this.url+'admin/mark/getAll/').map(res=>res.json());
	}
	addMarca(marca:Marca){
		// let json = JSON.stringify(marca);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/mark/save',marca).map(res=>res.json());
		//return this._http.post(this.url+'admin/mark/save',params, {headers:headers}).map(res=>res.json());
	}
	
	deleteMarca(id){
		// let json = JSON.stringify(marca);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/mark/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/mark/save',params, {headers:headers}).map(res=>res.json());
	}
}