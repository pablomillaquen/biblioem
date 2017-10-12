import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ModeloService} from '../services/modelo.service';
import {ManualService} from '../services/manual.service';
import {TorpedoService} from '../services/torpedo.service';
import {ProtocoloService} from '../services/protocolo.service';
import {RepuestoService} from '../services/repuesto.service';

import {Modelo} from '../modelo/modelo';
import {Manual} from '../manual/manual';
import {Protocolo} from '../protocolo/protocolo';
import {Torpedo} from '../torpedo/torpedo';
import {Repuesto} from '../repuesto/repuesto';

import * as _ from 'underscore';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'detallemodelo',
  templateUrl: './detallemodelo.component.html',
  providers: [ModeloService, ManualService, ProtocoloService, TorpedoService,RepuestoService]
}) 

export class DetallemodeloComponent {
	public modelo:Modelo;
	public manuales:Manual[];
	public protocolos:Protocolo[];
	public torpedos:Torpedo[];
	public torpedo:Torpedo;
	public repuestos:Repuesto[];
	public repuesto:Repuesto;

  	constructor(
  		private _modeloService:ModeloService,
  		private _manualService:ManualService,
  		private _protocoloService:ProtocoloService,
  		private _torpedoService: TorpedoService,
  		private _repuestoService: RepuestoService,
  		private _route: ActivatedRoute,
		private _router:Router
		) { 
  			this.torpedo = new Torpedo(0,"","",0);
  		}

  	ngOnInit() {
		this.getModelo();
		this.obtenerManuales();
		this.obtenerProtocolos();
		this.obtenerTorpedos();
		this.obtenerRepuestos();
	}

	getModelo(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			//alert (id);
			this._modeloService.getModelo1(id).subscribe(
				response =>{
					if(response.response == true){
						this.modelo = response.result;
						console.log(this.modelo);
					}else{
						this._router.navigate(['manualuser']);
					}
				},
				error=>{
					console.log(<any>error)
				})
		})
	}

	obtenerManuales(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._manualService.getManualxModelo(id).subscribe(
				result=>{	
					this.manuales= result.result;
					console.log(result);
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}

	obtenerProtocolos(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._protocoloService.getProtocoloxModelo(id).subscribe(
				result=>{	
					this.protocolos= result.result;
					console.log(result);
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}

	obtenerTorpedos(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._torpedoService.getTorpedoxModelo(id).subscribe(
				result=>{	
					this.torpedos= result.result;
					console.log(result);
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}

	obtenerRepuestos(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._repuestoService.getRepuestoxModelo(id).subscribe(
				result=>{	
					this.repuestos= result.result;
					console.log(result);
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}


	mostrarTorpedo(id){
		this.torpedo = _.findWhere(this.torpedos, {id: id});
		console.log(this.torpedo);
	}

	}
