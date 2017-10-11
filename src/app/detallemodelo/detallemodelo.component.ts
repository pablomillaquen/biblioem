import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {ManualService} from '../services/manual.service';
import {ProtocoloService} from '../services/protocolo.service';
import {Modelo} from '../modelo/modelo';
import {Manual} from '../manual/manual';
import {Protocolo} from '../protocolo/protocolo';

@Component({
  selector: 'detallemodelo',
  templateUrl: './detallemodelo.component.html',
  providers: [ModeloService, ManualService, ProtocoloService]
}) 

export class DetallemodeloComponent {
	public modelo:Modelo;
	public manuales:Manual[];
	public protocolos:Protocolo[];

  	constructor(
  		private _modeloService:ModeloService,
  		private _manualService:ManualService,
  		private _protocoloService:ProtocoloService,
  		private _route: ActivatedRoute,
		private _router:Router
		) { }

  	ngOnInit() {
		this.getModelo();
		this.obtenerManuales();
		this.obtenerProtocolos();
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
	}
