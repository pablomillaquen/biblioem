import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {GLOBAL} from './global';

@Injectable()

export class TipoequipoService{
	public url:string;

	constructor(public _http:Http){
		this.url = GLOBAL.url;
	}
	getTipoEquipo(){
		return this._http.get(this.url+'admin/type/getAll/').map(res=>res.json());
	}
	addTipoEquipo(tipoequipo:Tipoequipo){
		// let json = JSON.stringify(marca);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/type/save',tipoequipo).map(res=>res.json());
		//return this._http.post(this.url+'admin/type/save',params, {headers:headers}).map(res=>res.json());
	}
	
	deleteTipoEquipo(id){
		// let json = JSON.stringify(marca);
		// let params = 'json='+json;
		// let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'admin/type/delete/'+id,'').map(res=>res.json());
		//return this._http.post(this.url+'admin/type/save',params, {headers:headers}).map(res=>res.json());
	}
}