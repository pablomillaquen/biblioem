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
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;


/**
* Componente que administra la información de los manuales
*/
@Component({
	selector: 'manual',
	templateUrl:'./manual.component.html',
	providers: [ModeloService, ManualService]
})

export class ManualComponent{
	public manual:Manual;
	public selectedModel:Modelo;
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
	    maxHeight:'400px'
	};

	myTexts: IMultiSelectTexts = {
	    checkAll: 'Seleccionar todo',
	    uncheckAll: 'Limpiar',
	    checked: 'item seleccionado',
	    checkedPlural: 'items selecccionados',
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
		private _manualService: ManualService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		this.toastr.setRootViewContainerRef(vcr);
		this.manual = new Manual(0,"",0,"","",0);
		this.existe = false;
	}
	/**
	* Permite ejecutar funciones al iniciar el llamado al componente
	*/
	ngOnInit(){
		this.urlFiles= GLOBAL.urlFiles;
		this.obtenerManuales();
		this.obtenerModelosDD();
	}

	/**
	* Permite obtener el número de Modelo escogido en el dropdown
	*/
	SeleccionarModelos(){
		//console.log(this.optionsModel);
	}


	/**
	* Permite habilitar o deshabilitar el input de ingreso de ubicación de manual físico
	*/
	CambiarFisico(event:string): void{
	    this.existe = JSON.parse(event);
	    
	  }

	/**
	* Hace la subida del archivo y posteriormente, llama a otra función, para enviar los datos del manual a la API para guardarlos
	*/
	onSubmit(){

		
		if(this.manual.id === 0){
			this.manual = _.omit(this.manual, 'id');
			
		}
		jQuery("#ManualModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			this._modeloService.makeFileRequest(GLOBAL.url+'user/manual/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				this.resultUpload = result['result'];
				
				this.manual.url = this.resultUpload;
				
				this.saveManual();
				this.manual = new Manual(0,"",0,"","",0);
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveManual();
			this.manual = new Manual(0,"",0,"","",0);
		}
		
	}

	/**
	* Obtiene todos los manuales
	*/
	obtenerManuales(){
			this._manualService.getManual().subscribe(
				result=>{	
					this.manuales= result.result;
					
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
	* Función que guarda en manual en la BD
	*/
	saveManual(){
		for( let a=0;a<this.optionsModel.length;a++){
			this.manual.idModelo=this.optionsModel[a];
			this._manualService.addManual(this.manual).subscribe(
				response=>{
					if(response.response == true){
						
						this.toastr.success('Manual guardado exitosamente!', 'Exito!');
						this.obtenerManuales();
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
	* Abre el modal para actualizar los datos
	*/
	modalActualizar(id){
		this.manual = _.findWhere(this.manuales, {id: id});
		this.optionsModel=[];
		this.optionsModel.push(this.manual.idModelo);
		
	}

	/**
	* Elimina un manual
	*/
	deleteManual(id){
		let listanueva:Modelo[];
		this._manualService.deleteManual(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.manuales = _.without(this.manuales, _.findWhere(this.manuales, {
					  id: id
					}));
					
					this.toastr.success('Manual eliminado exitosamente!', 'Exito!');
					
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
	* Obtiene los datos del archivo subido y los guarda en un array para enviarlos posteriormente
	*/
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	/**
	* Limpia los datos para agregar un nuevo registro
	*/
	reiniciarManual(){
		this.optionsModel=[];
		this.manual = new Manual(0,"",0,"","",0);
	}	
		
}