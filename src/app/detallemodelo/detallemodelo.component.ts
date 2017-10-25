//Librerías varias
import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as _ from 'underscore';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
//Servicios
import {ModeloService} from '../services/modelo.service';
import {ManualService} from '../services/manual.service';
import {TorpedoService} from '../services/torpedo.service';
import {ProtocoloService} from '../services/protocolo.service';
import {RepuestoService} from '../services/repuesto.service';

//Modelos
import {Modelo} from '../modelo/modelo';
import {Manual} from '../manual/manual';
import {Protocolo} from '../protocolo/protocolo';
import {Torpedo} from '../torpedo/torpedo';
import {Repuesto} from '../repuesto/repuesto';
import {GLOBAL} from '../services/global';

  /**
  * Componente para visualización de los datos de 1 modelo en particular. 
  *No se requiere ser Admin para ver esta pantalla.
  */
@Component({
  selector: 'detallemodelo',
  templateUrl: './detallemodelo.component.html',
  providers: [ModeloService, ManualService, ProtocoloService, TorpedoService,RepuestoService],
  styleUrls: ['./detallemodelo.component.css']
}) 


export class DetallemodeloComponent {
	public manuales:Manual[];
	public protocolos:Protocolo[];
	public torpedos:Torpedo[];
	public repuestos:Repuesto[];

	public modelo:Modelo;
	public torpedo:Torpedo;
	public repuesto:Repuesto;

	public urlFiles:string;
	
  	constructor(
  		private _route: ActivatedRoute,
		private _router:Router,
  		private _modeloService:ModeloService,
  		private _manualService:ManualService,
  		private _protocoloService:ProtocoloService,
  		private _torpedoService: TorpedoService,
  		private _repuestoService: RepuestoService
		) { 
  			this.torpedo = new Torpedo(0,"","","",0);
  		}

  	/**
	* Ejecuta las funciones necesarias al iniciar el componente
	*/
  	ngOnInit() {
		this.urlFiles= GLOBAL.urlFiles;
		this.getModelo();
		this.obtenerManuales();
		this.obtenerProtocolos();
		this.obtenerTorpedos();
		this.obtenerRepuestos();
	}

	/**
	* Obtiene el modelo solicitado
	*/
	getModelo(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._modeloService.userGetModelo1(id).subscribe(
				response =>{
					if(response.response == true){
						this.modelo = response.result;
					}else{
						this._router.navigate(['manualuser']);
					}
				},
				error=>{
					console.log(<any>error)
				})
		})
	}

	/**
	*Obtiene todos los manuales para ese modelo
	*/
	obtenerManuales(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._manualService.userGetManualxModelo(id).subscribe(
				result=>{	
					this.manuales= result.result;
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}

	/**
	*Obtiene todos los protocolos para ese modelo
	*/
	obtenerProtocolos(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._protocoloService.userGetProtocoloxModelo(id).subscribe(
				result=>{	
					this.protocolos= result.result;
					
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}

	/**
	* Obtiene todos los "torpedos", "ayudamemorias" o apuntes disponibles para ese modelo
	*/
	obtenerTorpedos(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._torpedoService.userGetTorpedoxModelo(id).subscribe(
				result=>{	
					this.torpedos= result.result;
					
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}

	/**
	* Obtiene todos los repuestos asociados a ese modelo
	*/
	obtenerRepuestos(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			this._repuestoService.userGetRepuestoxModelo(id).subscribe(
				result=>{	
					this.repuestos= result.result;
					
					},
				error=>{
					console.log(<any>error);
					}
				)
			})
		}

	/**
	* Permite rellenar la info en el modal de "Apuntes"
	*/
	mostrarTorpedo(id){
		this.torpedo = _.findWhere(this.torpedos, {id: id});
		
	}

	}
