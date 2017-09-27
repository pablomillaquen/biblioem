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
	
}