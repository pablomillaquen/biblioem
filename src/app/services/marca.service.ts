import {Injectable} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Marca} from '../marca/marca';
import {GLOBAL} from './global';

@Injectable()

export class MarcaService{
	public url:string;

	constructor(public _authHttp: AuthHttp){
		this.url = GLOBAL.url;
	}

	/*******************************************************************
	RUTAS DE ADMIN
	*******************************************************************/
	
	//Obtiene todas las marcas
	getMarca(){
		return this._authHttp.get(this.url+'admin/mark/getAll/').map(res=>res.json());
	}
	//Permite agregar nuevas marcas
	addMarca(marca:Marca){
		return this._authHttp.post(this.url+'admin/mark/save',marca).map(res=>res.json());
	}
	
	deleteMarca(id){
		return this._authHttp.post(this.url+'admin/mark/delete/'+id,'').map(res=>res.json());
	}
}