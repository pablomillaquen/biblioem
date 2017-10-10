import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {ManualService} from '../services/manual.service';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {Marca} from '../marca/marca';
import {Modelo} from '../modelo/modelo';
import {Manual} from './manual';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

 
@Component({
	selector: 'manual',
	templateUrl:'./manual.component.html',
	providers: [ModeloService, ManualService]
})

export class ManualComponent{
	public manual:Manual;
	public selectedModel:Modelo;
	public selectedMark:Marca;
	public selectedType:Tipoequipo;
	public Listtipo:Array<Tipoequipo>;
	public Listmarca:Array<Marca>;
	public Listmodelo:Array<Modelo>;
	public modelos:Modelo[];
	public manuales: Manual[];
	public existe:Boolean;

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
		private _manualService: ManualService,
		//private _tipoequipoService: TipoequipoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		this.toastr.setRootViewContainerRef(vcr);
		this.manual = new Manual(0,"",0,"","",0);

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
		this.existe = false;
	}

	ngOnInit(){
		//console.log(this.Listmodelo);
		this.obtenerManuales();
		this.obtenerModelos();
	}

	SeleccionarModelo(event:string): void{
	    this.manual.idModelo = JSON.parse(event);
	    console.log(this.selectedModel);
	  }

	SeleccionarMarca(event:string): void{
	    this.selectedMark = JSON.parse(event);
	    console.log(this.selectedMark);
	  }

	SeleccionarTipo(event:string): void{
	    this.selectedType = JSON.parse(event);
	    console.log(this.selectedType);
	  }

	CambiarFisico(event:string): void{
	    this.existe = JSON.parse(event);
	    console.log(this.existe);
	  }

	onSubmit(){

		console.log(this.manual);
		if(this.manual.id === 0){
			this.manual = _.omit(this.manual, 'id');
			console.log(this.manual);
		}
		jQuery("#ManualModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			console.log(this.filesToUpload);
			this._modeloService.makeFileRequest(GLOBAL.url+'admin/manual/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				//console.log(result);
				this.resultUpload = result['result'];
				//this.resultUpload = result.result;
				//console.log(this.resultUpload);
				this.manual.url = this.resultUpload;
				console.log(this.manual);
				this.saveManual();
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveManual();
		}
		
	}

	obtenerManuales(){
			this._manualService.getManual().subscribe(
				result=>{	
					this.manuales= result.result;
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

	saveManual(){
			this._manualService.addManual(this.manual).subscribe(
				response=>{
					if(response.response == true){
						
						this.toastr.success('Manual guardado exitosamente!', 'Exito!');
						//this.modelo = new Modelo(0,"");
						this.obtenerManuales();
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
		this.manual = _.findWhere(this.manuales, {id: id});
		console.log(this.manual);
	}

	deleteManual(id){
		let listanueva:Modelo[];
		this._manualService.deleteManual(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.manuales = _.without(this.manuales, _.findWhere(this.manuales, {
					  id: id
					}));
					console.log(this.manuales);
					this.toastr.success('Manual eliminado exitosamente!', 'Exito!');
					
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