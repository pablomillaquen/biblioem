import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Empleado } from '../empleado/empleado';
import { EmpleadoService } from '../services/empleado.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
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

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef,
		private _empleadoService: EmpleadoService
		) { 
			this.title="Indetifíquese";
			this.empleado = new Empleado(0,'','','',0,'','');

	}

	ngOnInit() {
	 
	}

	onSubmit(){
		console.log(this.empleado);
		this._empleadoService.loginUser(this.empleado).subscribe(
			response=>{
				this.identity =response.user;
				if(!this.identity || this.identity._id){
					alert ("El usuario no se ha logueado correctamente");
				}else{
					this._empleadoService.loginUser(this.empleado,'true').subscribe(
						response=>{
							this.token= response.token;
							if(this.token.length <= 0){
								alert('El token no se ha generado');
							}else{
								console.log(this.token);
							}
						},
						error=>{
							console.log(<any>error);
						});
				}
			},
			error=>{
				console.log(<any>error);
			}

			);
	}

}
