import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Empleado } from '../empleado/empleado';
import { EmpleadoService } from '../services/empleado.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [EmpleadoService]
})
export class LoginComponent implements OnInit {
	public title:String;
	public empleado:Empleado;
	public identity;
	public token;
	public dataToken;
	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef,
		private _empleadoService: EmpleadoService
		) { 
			this.toastr.setRootViewContainerRef(vcr);
			this.title="Sección de administración";
			this.empleado = new Empleado(0,'','','',0,'','');

	}

	ngOnInit() {
		this.checkLogin();
	}

	onSubmit(){
		console.log(this.empleado);
		this._empleadoService.loginUser(this.empleado).subscribe(
			response=>{
				this.token= response.result;
				if(this.token == null){
					this.toastr.error('Error en los datos ingresados', 'Error!');
					this.empleado.id = 0;
					this.empleado.correo = '';
				}else{
					localStorage.setItem('token', this.token);
					this.dataToken = this.jwtHelper.decodeToken(this.token);
					localStorage.setItem('user', JSON.stringify(this.dataToken.data));
					localStorage.setItem('exp', JSON.stringify(this.dataToken.exp));
					this._router.navigate(['indexadmin']);
				}
				
			},
			error=>{
				console.log(<any>error);
			}

			);
	}

	checkLogin(){
		let currentDate = moment().format("X");
		if(localStorage.getItem('user') != '' && localStorage.getItem('exp') != '' && currentDate <= localStorage.getItem('exp') ){
			this._router.navigate(['indexadmin']);
		}
	}

}
