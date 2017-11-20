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
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

	/**
	* Componente que permite administrar los protocolos de mantenimientos preventivos de cada modelo de equipo
	*/
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
	public urlFiles:string;
	/**
	* Parámetros para Selección Múltiple de Modelos en el Modal
	*/
	optionsModel: number[];
    myOptions: IMultiSelectOption[];

    mySettings: IMultiSelectSettings = {
	    enableSearch: true,
	    checkedStyle: 'fontawesome',
	    buttonClasses: 'btn btn-default btn-block btn-sm',
	    dynamicTitleMaxItems: 3,
	    displayAllSelectedText: true,
	    showCheckAll:true,
	    showUncheckAll:true,
	    maxHeight:'120px'
	};

	myTexts: IMultiSelectTexts = {
	    checkAll: 'Seleccionar todo',
	    uncheckAll: 'Limpiar',
	    checked: 'item seleccionado',
	    checkedPlural: 'items seleccionados',
	    searchPlaceholder: 'Buscar',
	    searchEmptyResult: 'No encontrado...',
	    searchNoRenderText: 'Escriba en la caja de búsqueda para ver resultados...',
	    defaultTitle: 'Seleccionar',
	    allSelected: 'Todo seleccionado'
	};

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

		this.existe = false;
	}
	/**
	* Ejecuta las funciones necesarias al iniciar el llamado al componente
	*/
	ngOnInit(){
		this.urlFiles=GLOBAL.urlFiles;
		this.obtenerProtocolos();
		this.obtenerModelosDD();
	}


	
	/**
	* Envía el archivo a la carpeta /uploads/protocolos/ ubicado en la raíz de la API y luego llama a otra función para que guarde los datos en la BD
	*/
	onSubmit(){

		
		if(this.protocolo.id === 0){
			this.protocolo = _.omit(this.protocolo, 'id');
			
		}
		jQuery("#ProtocoloModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			
			this._protocoloService.makeFileRequest(GLOBAL.url+'user/protocolo/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				this.resultUpload = result['result'];
				this.protocolo.url = this.resultUpload;
				
				this.saveProtocolo();
				this.protocolo = new Protocolo(0,"","",0);
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveProtocolo();
			this.protocolo = new Protocolo(0,"","",0);
		}
		
	}

	/**
	* Obtiene la lista de protocolos existentes
	*/
	obtenerProtocolos(){
			this._protocoloService.getProtocolo().subscribe(
				result=>{	
					this.protocolos= result.result;
					},
				error=>{
					console.log(<any>error);
					}
				);
		}

	/**
	* Obtiene todos los modelos
	*/
	obtenerModelosDD(){
			this._modeloService.getModeloDropdown().subscribe(
				result=>{	
					this.myOptions = result.result;
					},
				error=>{
					console.log(<any>error);
					}
				);
		}

	/**
	* Guarda los protocolos
	*/
	saveProtocolo(){
		for( let a=0;a<this.optionsModel.length;a++){
			this.protocolo.idModelo=this.optionsModel[a];
			this._protocoloService.addProtocolo(this.protocolo).subscribe(
				response=>{
					if(response.response == true){
						
						this.toastr.success('Protocolo guardado exitosamente!', 'Exito!');
						this.obtenerProtocolos();
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
		}



	/**
	* Abre el modal para actualizar los protocolos
	*/
	modalActualizar(id){
		this.protocolo = _.findWhere(this.protocolos, {id: id});
		this.optionsModel=[];
		this.optionsModel.push(this.protocolo.idModelo);
	}

	/**
	* Elimina el protocolo
	*/
	deleteProtocolo(id){
		let listanueva:Modelo[];
		this._protocoloService.deleteProtocolo(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.protocolos = _.without(this.protocolos, _.findWhere(this.protocolos, {
					  id: id
					}));
					this.toastr.success('Protocolo eliminado exitosamente!', 'Exito!');
					
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
	* Obtiene la lista de protocolos existentes
	*/
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		
	}
	
	/**
	* Limpia los datos para agregar un nuevo registro
	*/
	reiniciarProtocolo(){
		this.optionsModel=[];
		this.protocolo = new Protocolo(0,"","",0);
	}	
		
	}