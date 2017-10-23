import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {TorpedoService} from '../services/torpedo.service';
import {Modelo} from '../modelo/modelo';
import {Torpedo} from './torpedo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

/**
* Componente que administra la información de la tabla Torpedo
*/
@Component({
	selector: 'torpedo',
	templateUrl:'./torpedo.component.html',
	providers: [ModeloService, TorpedoService]
})

export class TorpedoComponent{
	public torpedo:Torpedo;
	public selectedModel:Modelo;
	public Listmodelo:Array<Modelo>;
	public modelos:Modelo[];
	public torpedos: Torpedo[];
	
	public filterQuery = "";
	public rowsOnPage = 5;
	public sortBy = "nombre";
	public sortOrder = "asc";

	public filesToUpload;
	public resultUpload;
	public urlFiles:string;

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _modeloService: ModeloService,
		private _torpedoService: TorpedoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		this.toastr.setRootViewContainerRef(vcr);
		this.torpedo = new Torpedo(0,"","","",0);
	}


	/**
	* Ejecuta las funciones necesarias al iniciar el componente
	*/
	ngOnInit(){
		this.urlFiles= GLOBAL.urlFiles;
		this.obtenerTorpedos();		
		this.obtenerModelos();
	}

	SeleccionarModelo(event:string): void{
	    this.torpedo.idModelo = JSON.parse(event);
	  }

	/**
	* Guarda los datos de los apuntes (torpedos)
	*/
	onSubmit(){

		if(this.torpedo.id === 0){
			this.torpedo = _.omit(this.torpedo, 'id');
		}
		jQuery("#TorpedoModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			this._modeloService.makeFileRequest(GLOBAL.url+'user/torpedo/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				this.resultUpload = result['result'];
				this.torpedo.url = this.resultUpload;
				this.saveTorpedo();
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveTorpedo();
		}
		
	}

	/**
	* Obtiene todas los torpedos
	*/
	obtenerTorpedos(){
			this._torpedoService.getTorpedo().subscribe(
				result=>{	
					this.torpedos= result.result;
					},
				error=>{
					console.log(<any>error);
					}
				);
		}

	/**
	* Obtiene todos los modelos
	*/
	obtenerModelos(){
			this._modeloService.getModelo().subscribe(
				result=>{	
					this.modelos= result.result;
					},
				error=>{
					console.log(<any>error);
					}
				);
		}

	/**
	* Guarda un nuevo registro de torpedo
	*/
	saveTorpedo(){
			this._torpedoService.addTorpedo(this.torpedo).subscribe(
				response=>{
					if(response.response == true){
						
						this.toastr.success('Apunte guardado exitosamente!', 'Exito!');
						this.torpedo = new Torpedo(0,"","","",0);
						this.obtenerTorpedos();
					}else{
						this.toastr.error('Hubo un error en la respuesta del servidor!', 'Error!');
					}

				},
				error=>{
					console.log(<any>error);
					this.toastr.error('No se pudo realizar la tarea!', 'Error!');
					}
				);
		}

	/**
	* Obtiene los datos del torpedo seleccionado y los carga en el formulario para actualizarlos
	*/
	modalActualizar(id){
		this.torpedo = _.findWhere(this.torpedos, {id: id});
		
	}

	/**
	* Elimina un torpedo
	*/
	deleteTorpedo(id){
		this._torpedoService.deleteTorpedo(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.torpedos = _.without(this.torpedos, _.findWhere(this.torpedos, {
					  id: id
					}));
					this.toastr.success('Torpedo eliminado exitosamente!', 'Exito!');
					
				}else{
					this.toastr.error('Hubo un error en la respuesta del servidor!', 'Error!');
				}

			},
			error=>{
				console.log(<any>error);
				this.toastr.error('No se pudo realizar la tarea!', 'Error!');
				}
			);
	}

	/**
	* Obtiene la información del archivo que se desea subir y lo guarda en un array.
	*/
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		
	}
		
	}