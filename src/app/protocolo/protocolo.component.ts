import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {ProtocoloService} from '../services/protocolo.service';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {Marca} from '../marca/marca';
import {Modelo} from '../modelo/modelo';
import {Protocolo} from '../protocolo/protocolo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

 
@Component({
	selector: 'protocolo',
	templateUrl:'./protocolo.component.html',
	providers: [ModeloService, ProtocoloService]
})

export class ProtocoloComponent{
	public protocolo:Protocolo;
	public selectedModel:Modelo;
	public selectedMark:Marca;
	public selectedType:Tipoequipo;
	public Listtipo:Array<Tipoequipo>;
	public Listmarca:Array<Marca>;
	public Listmodelo:Array<Modelo>;
	public modelos:Modelo[];
	public protocolos: Protocolo[];
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
		private _protocoloService: ProtocoloService,
		//private _tipoequipoService: TipoequipoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		this.toastr.setRootViewContainerRef(vcr);
		this.protocolo = new Protocolo(0,"","",0);

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
		this.obtenerProtocolos();
		this.obtenerModelos();
	}

	SeleccionarModelo(event:string): void{
	    this.protocolo.idModelo = JSON.parse(event);
	    console.log(this.protocolo.idModelo);
	  }

	SeleccionarMarca(event:string): void{
	    this.selectedMark = JSON.parse(event);
	    console.log(this.selectedMark);
	  }

	SeleccionarTipo(event:string): void{
	    this.selectedType = JSON.parse(event);
	    console.log(this.selectedType);
	  }


	onSubmit(){

		console.log(this.protocolo);
		if(this.protocolo.id === 0){
			this.protocolo = _.omit(this.protocolo, 'id');
			console.log(this.protocolo);
		}
		jQuery("#ProtocoloModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			console.log(this.filesToUpload);
			this._protocoloService.makeFileRequest(GLOBAL.url+'admin/protocolo/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				//console.log(result);
				this.resultUpload = result['result'];
				//this.resultUpload = result.result;
				//console.log(this.resultUpload);
				this.protocolo.url = this.resultUpload;
				console.log(this.protocolo);
				this.saveProtocolo();
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveProtocolo();
		}
		
	}

	obtenerProtocolos(){
			this._protocoloService.getProtocolo().subscribe(
				result=>{	
					this.protocolos= result.result;
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

	saveProtocolo(){
			this._protocoloService.addProtocolo(this.protocolo).subscribe(
				response=>{
					if(response.response == true){
						
						this.toastr.success('Protocolo guardado exitosamente!', 'Exito!');
						//this.modelo = new Modelo(0,"");
						this.obtenerProtocolos();
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
		this.protocolo = _.findWhere(this.protocolos, {id: id});
		console.log(this.protocolo);
	}

	deleteProtocolo(id){
		let listanueva:Modelo[];
		this._protocoloService.deleteProtocolo(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.protocolos = _.without(this.protocolos, _.findWhere(this.protocolos, {
					  id: id
					}));
					console.log(this.protocolos);
					this.toastr.success('Protocolo eliminado exitosamente!', 'Exito!');
					
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