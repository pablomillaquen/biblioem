import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {TorpedoService} from '../services/torpedo.service';
//import {Tipoequipo} from '../tipoequipo/tipoequipo';
//import {Marca} from '../marca/marca';
import {Modelo} from '../modelo/modelo';
import {Torpedo} from './torpedo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

 
@Component({
	selector: 'torpedo',
	templateUrl:'./torpedo.component.html',
	providers: [ModeloService, TorpedoService]
})

export class TorpedoComponent{
	public torpedo:Torpedo;
	public selectedModel:Modelo;
	// public selectedMark:Marca;
	// public selectedType:Tipoequipo;
	// public Listtipo:Array<Tipoequipo>;
	// public Listmarca:Array<Marca>;
	public Listmodelo:Array<Modelo>;
	public modelos:Modelo[];
	public torpedos: Torpedo[];
	//public existe:Boolean;

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
		private _torpedoService: TorpedoService,
		//private _tipoequipoService: TipoequipoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		this.toastr.setRootViewContainerRef(vcr);
		this.torpedo = new Torpedo(0,"","",0);

		// this.Listtipo = [
		// 	new Tipoequipo(1,'Monitor multiparámetros'),
		// 	new Tipoequipo(2,'Ecógrafo'),
		// 	new Tipoequipo(3,'Máquina anestesia'),
		// 	new Tipoequipo(4,'Otro')
		// 	];
		// this.Listmarca = [
		// 	new Marca(1,'Siemens'),
		// 	new Marca(2,'GE'),
		// 	new Marca(3,'Drager'),
		// 	new Marca(4,'Otro')
		// 	];
		// this.Listmodelo = [
		// 	new Modelo(1,'Modelo1', 3, 3,'1.jpg'),
		// 	new Modelo(2,'Modelo2', 2, 1, '2.jpg'),
		// 	new Modelo(3,'Modelo3', 3, 2, '3.jpg'),
		// 	new Modelo(4,'Otro', 6, 3, '9.jpg')
		// 	];
		//this.existe = false;
	}

	ngOnInit(){
		//console.log(this.Listmodelo);
		this.obtenerTorpedos();
		this.obtenerModelos();
	}

	SeleccionarModelo(event:string): void{
	    this.torpedo.idModelo = JSON.parse(event);
	    console.log(this.selectedModel);
	  }

	// SeleccionarMarca(event:string): void{
	//     this.selectedMark = JSON.parse(event);
	//     console.log(this.selectedMark);
	//   }

	// SeleccionarTipo(event:string): void{
	//     this.selectedType = JSON.parse(event);
	//     console.log(this.selectedType);
	//   }

	// CambiarFisico(event:string): void{
	//     this.existe = JSON.parse(event);
	//     console.log(this.existe);
	//   }

	onSubmit(){

		console.log(this.torpedo);
		if(this.torpedo.id === 0){
			this.torpedo = _.omit(this.torpedo, 'id');
			console.log(this.torpedo);
		}
		jQuery("#TorpedoModal").modal("hide");

		// if(this.filesToUpload && this.filesToUpload.length>=1){
		// 	console.log(this.filesToUpload);
		// 	this._modeloService.makeFileRequest(GLOBAL.url+'admin/torpedo/upload-file',[],this.filesToUpload)
		// .then(
		// 	(result)=>{
		// 		//console.log(result);
		// 		this.resultUpload = result['result'];
		// 		//this.resultUpload = result.result;
		// 		//console.log(this.resultUpload);
		// 		this.torpedo.url = this.resultUpload;
		// 		console.log(this.torpedo);
		// 		this.saveTorpedo();
		// 	},
		// 	(error)=>{
		// 		console.log(<any>error);
		// 	});
		// }else{
			this.saveTorpedo();
		//}
		
	}

	obtenerTorpedos(){
			this._torpedoService.getTorpedo().subscribe(
				result=>{	
					this.torpedos= result.result;
					//console.log(result);
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
					//console.log(result);
					},
				error=>{
					console.log(<any>error);
					}
				);
		}

	saveTorpedo(){
			this._torpedoService.addTorpedo(this.torpedo).subscribe(
				response=>{
					if(response.response == true){
						
						this.toastr.success('Manual guardado exitosamente!', 'Exito!');
						this.torpedo = new Torpedo(0,"","",0);
						this.obtenerTorpedos();
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

	modalActualizar(id){
		this.torpedo = _.findWhere(this.torpedos, {id: id});
		console.log(this.torpedo);
	}

	deleteTorpedo(id){
		let listanueva:Modelo[];
		this._torpedoService.deleteTorpedo(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.torpedos = _.without(this.torpedos, _.findWhere(this.torpedos, {
					  id: id
					}));
					console.log(this.torpedos);
					this.toastr.success('Torpedo eliminado exitosamente!', 'Exito!');
					
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
		//console.log(this.filesToUpload);
	}
		
	}