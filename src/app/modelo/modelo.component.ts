import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {MarcaService} from '../services/marca.service';
import {TipoequipoService} from '../services/tipoequipo.service';
import {RepuestoService} from '../services/repuesto.service';
import {Modelo} from '../modelo/modelo';
import {RepuestoModelo} from '../repuesto/repuestomodelo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {Marca} from '../marca/marca';
import {Repuesto} from '../repuesto/repuesto';

/**
* Componente que administra los modelos, dentro de la BD
*/
@Component({
	selector: 'modelo',
	templateUrl:'./modelo.component.html',
	providers: [ModeloService,MarcaService,TipoequipoService,RepuestoService]
})

export class ModeloComponent{
	
	public selectedModel:Modelo;
	public selectedRepuesto:Repuesto;
	public selectedRepMod:RepuestoModelo;
	public selectedType:Tipoequipo;
	public Listmarcas:Marca[];
	public Listtipo:Tipoequipo[];
	public repuestos:Repuesto[];
	public repuesto:Repuesto;
	public repuestosxmod:RepuestoModelo[];
	public repuestoxmod: RepuestoModelo;
	public modelos:Modelo[];
	public modelo:Modelo;
	public filterQuery = "";
	public rowsOnPage = 5;
	public sortBy = "nombre";
	public sortOrder = "asc";
	public filesToUpload;
	public resultUpload;

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _modeloService: ModeloService,
		private _marcaService: MarcaService,
		private _tipoequipoService: TipoequipoService,
		private _repuestoService: RepuestoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		
		this.modelo = new Modelo(0,'', 0, 0, GLOBAL.defaultImage);
		this.repuesto = new Repuesto(0,'','','', GLOBAL.defaultImage);
		this.repuestoxmod =new RepuestoModelo(0,0,'','',GLOBAL.defaultImage, '');
		this.toastr.setRootViewContainerRef(vcr);
	
	}
	/**
	* Envía el archivo de foto a la carpeta /uploads/fotos/ dentro de los archivos de la API, posteriormente llama a otra función para guardar los datos
	*/
	onSubmit(){

		console.log(this.modelo);
		if(this.modelo.id === 0){
			this.modelo = _.omit(this.modelo, 'id');
			console.log(this.modelo);
		}
		jQuery("#ModeloModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			console.log(this.filesToUpload);
			this._modeloService.makeFileRequest(GLOBAL.url+'user/modelo/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				this.resultUpload = result['result'];
				this.modelo.foto = this.resultUpload;
				console.log(this.modelo);
				this.saveModelo();
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveModelo();
		}
		
	}

	
	/**
	* Ejecuta las funciones necesarias al iniciar el llamado al componente
	*/
	ngOnInit(){
		
		this.obtenerModelos();
		this.obtenerMarcas();
		this.obtenerTipos();
		this.obtenerRepuestos();
	}

	/**
	* Guarda el modelo
	*/
	saveModelo(){
		this._modeloService.addModelo(this.modelo).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Modelo guardado exitosamente!', 'Exito!');
					//this.modelo = new Modelo(0,"");
					this.obtenerModelos();
				}else{
					console.log(response);
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
	* Obtiene el dato desde el dropdown de modelos
	*/
  SeleccionarModelo(event:string): void{
    this.repuestoxmod.id = JSON.parse(event);
  }

  /**
	* Obtiene el dato desde el dropdown de marcas
	*/
  SeleccionarMarca(event:string): void{
    this.modelo.idMarca = JSON.parse(event);
  }

  /**
	* Obtiene el dato desde el dropdown de tipos de equipos
	*/
  SeleccionarTipo(event:string): void{
    this.modelo.idTipo = JSON.parse(event);
  }

  /**
	* Obtiene el dato desde el dropdown de repuestos
	*/
  SeleccionarRepuesto(event:string): void{
    this.repuestoxmod.idRepuesto = JSON.parse(event);
    console.log(this.repuestoxmod);
  }

  	/**
	* Obtiene todas las marcas existentes en la base de datos
	*/
    obtenerMarcas(){
		this._marcaService.getMarca().subscribe(
			result=>{	
				this.Listmarcas= result.result;
				//console.log(this.Listmarcas);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

	/**
	* Obtiene todos los tipos de equipos existentes en la base de datos
	*/
	obtenerTipos(){
		this._tipoequipoService.getTipoEquipo().subscribe(
			result=>{	
				this.Listtipo= result.result;
				//console.log(this.Listmarcas);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

	/**
	* Obtiene todos los modelos existentes en la base de datos
	*/
    obtenerModelos(){
		this._modeloService.getModelo().subscribe(
			result=>{	
				this.modelos= result.result;
				//console.log(result);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

	/**
	* Obtiene todos los repuestos existentes en la base de datos
	*/
	obtenerRepuestos(){
		this._repuestoService.getRepuesto().subscribe(
			result=>{	
				this.repuestos= result.result;
				//console.log(result);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

	/**
	* Obtiene los repuestos existentes para un modelo en particular
	*/
	obtenerRepuestosxmod(id){
			this._repuestoService.getRepuestoxModelo(id).subscribe(
				result=>{	
					this.repuestosxmod= result.result;
					console.log(result);
					},
				error=>{
					console.log(<any>error);
					}
				)
		
		}

	/**
	* Envía los datos de un nuevo repuesto
	*/
	onSubmitRepuesto(){

		jQuery("#RepuestoModal").modal("hide");
		this._repuestoService.addRepuestoxmod(this.repuestoxmod).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Repuesto guardado exitosamente!', 'Exito!');
					//this.repuesto = new Repuesto(0,0,'','',GLOBAL.defaultImage,'');
					this.obtenerMarcas();
				}else{
					console.log(response);
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
	* Abre el modal modeloModal para actualizar los datos
	*/
	modalActualizar(id){
		this.modelo = _.findWhere(this.modelos, {id: id});
		//this.repuestoxmod.id =id;
		console.log(this.modelo);
	}

	/**
	* Abre el modal repuestoModal para actualizar los datos
	*/
	modalRepuesto(id){
		this.modelo = _.findWhere(this.modelos, {id: id});
		this.repuestoxmod.id =id;
		console.log(this.repuestoxmod);
		this.obtenerRepuestosxmod(this.modelo.id);
	}

	/**
	* Elimina el modelo
	*/
	deleteModelo(id){
		let listanueva:Modelo[];
		this._modeloService.deleteModelo(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.modelos = _.without(this.modelos, _.findWhere(this.modelos, {
					  id: id
					}));
					console.log(this.modelos);
					this.toastr.success('Modelo eliminado exitosamente!', 'Exito!');
					
				}else{
					console.log(response);
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
	* Elimina el repuesto
	*/
	deleteRepuestoModelo(id, idRepuesto){
		this._repuestoService.deleteRepuestoxMod(id, idRepuesto).subscribe(
			response=>{
				if(response.response == true){
					jQuery("#RepuestoModal").modal("hide");
					this.toastr.success('Repuesto eliminado exitosamente!', 'Exito!');
					
				}else{
					console.log(response);
					jQuery("#RepuestoModal").modal("hide");
					this.toastr.error('Hubo un error en la respuesta del servidor!', 'Error!');
				}

			},
			error=>{
				console.log(<any>error);
				jQuery("#RepuestoModal").modal("hide");
				this.toastr.error('No se pudo realizar la tarea!', 'Error!');
				}
			);

	}
	
	/**
	* Obtiene el dato del archivo subido, lo guarda en un array para usarlo posteriormente
	*/
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}