import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Empleado } from '../empleado/empleado';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public title:String;
	public empleado:Empleado;

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		) { 
			this.title="Indetifíquese";
			this.empleado = new Empleado(0,'','','',0,'','');

	}

	ngOnInit() {
	 
	}

	onSubmit(){
		console.log(this.empleado);
	}

}
