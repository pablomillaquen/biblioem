import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {MarcaService} from '../services/marca.service';
import {Modelo} from '../modelo/modelo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {Marca} from '../marca/marca';

 
@Component({
	selector: 'modelo',
	templateUrl:'./modelo.component.html',
	providers: [ModeloService, MarcaService]
})

export class ModeloComponent{
	
	public selectedModel:Modelo;
	public selectedMark:Marca;
	public selectedType:Tipoequipo;
	public Listtipo:Array<Tipoequipo>;
	//public Listmarca:Array<Marca>;
	public Listmarcas:Marca[];
	//public Listmodelo:Array<Modelo>;
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
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		
		this.modelo = new Modelo(0,'', '', 0, 0);
		this.toastr.setRootViewContainerRef(vcr);

		this.Listtipo = [
			new Tipoequipo(1,'Máquina anestesia'),
			new Tipoequipo(2,'Ecógrafo'),
			new Tipoequipo(3,'Monitor multiparámetros'),
			new Tipoequipo(4,'Otro')
			];
		// this.Listmarca = [
		// 	new Marca(1,'Siemens'),
		// 	new Marca(2,'GE'),
		// 	new Marca(3,'Drager'),
		// 	new Marca(4,'Otro')
		// 	];
		// this.Listmodelo = [
		// 	new Modelo(1,'Modelo1', '1.jpg', 3, 3),
		// 	new Modelo(2,'Modelo2', '2.jpg', 2, 1),
		// 	new Modelo(3,'Modelo3', '3.jpg', 3, 2),
		// 	new Modelo(4,'Otro', '9.jpg', 6, 3)
		// 	];
	}
	onSubmit(){

		console.log(this.modelo);
		if(this.modelo.id === 0){
			this.modelo = _.omit(this.modelo, 'id');
			console.log(this.modelo);
		}
		jQuery("#ModeloModal").modal("hide");

		if(this.filesToUpload.lenght>=1){
			this._modeloService.makeFileRequest(GLOBAL.url+'upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				console.log(result);
				this.resultUpload = result;
				this.modelo.foto = this.resultUpload.filename;
				this.saveModelo();
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveModelo();
		}
		
	}

	ngOnInit(){
		//console.log(this.Listmodelo);
		this.obtenerModelos();
		this.obtenerMarcas();
	}

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
  SeleccionarModelo(event:string): void{
    this.modelo.idTipo = JSON.parse(event);
    console.log(this.modelo);
  }

  SeleccionarMarca(event:string): void{
    this.modelo.idMarca = JSON.parse(event);
    console.log(this.modelo);
  }

  SeleccionarTipo(event:string): void{
    this.modelo.idTipo = JSON.parse(event);
    console.log(this.modelo);
  }

    obtenerMarcas(){
		this._marcaService.getMarca().subscribe(
			result=>{	
				this.Listmarcas= result.result;
				console.log(this.Listmarcas);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

    obtenerModelos(){
		this._modeloService.getModelo().subscribe(
			result=>{	
				this.modelos= result.result;
				console.log(this.modelos);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}
	modalActualizar(id){
		this.modelo = _.findWhere(this.modelos, {id: id});
		console.log(this.modelo);
	}

	deleteMarca(id){
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

	
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}