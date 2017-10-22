import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {RepuestoService} from '../services/repuesto.service';
import {Repuesto} from '../repuesto/repuesto';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

/**
* Componente que administra los repuestos disponibles
*/ 
@Component({
	selector: 'repuesto',
	templateUrl:'./repuesto.component.html',
	providers: [RepuestoService]
})

export class RepuestoComponent{
	
	
	public repuestos:Repuesto[];
	public repuesto:Repuesto;

	public filterQuery = "";
	public rowsOnPage = 5;
	public sortBy = "nombre";
	public sortOrder = "asc";
	public filesToUpload;
	public resultUpload;

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _repuestoService: RepuestoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		){
		
		this.repuesto = new Repuesto(0,'','','', GLOBAL.defaultImage);
		this.toastr.setRootViewContainerRef(vcr);

	}

	/**
	* Envía el archivo a la carpeta /uploads/foto-repuestos/ ubicado en la raíz de la API y luego llama a otra función para que guarde los datos en la BD
	*/
	onSubmit(){

		if(this.repuesto.id === 0){
			this.repuesto = _.omit(this.repuesto, 'id');
		}
		jQuery("#RepuestoModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			this._repuestoService.makeFileRequest(GLOBAL.url+'user/repuesto/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				this.resultUpload = result['result'];
				this.repuesto.foto = this.resultUpload;
				this.saveRepuesto();
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveRepuesto();
		}
		
	}

	/**
	* Ejecuta las funciones necesarias en el momento que se llama al componente
	*/
	ngOnInit(){
		this.obtenerRepuestos();
	}


	/**
	* Guarda los datos del repuesto en la BD
	*/
	saveRepuesto(){
		this._repuestoService.addRepuesto(this.repuesto).subscribe(
			response=>{
				if(response.response == true){
					this.toastr.success('Repuesto guardado exitosamente!', 'Exito!');
					this.obtenerRepuestos();
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
	* Obtiene todos los repuestos
	*/
    obtenerRepuestos(){
		this._repuestoService.getRepuesto().subscribe(
			result=>{	
				this.repuestos= result.result;
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

	/**
	* Obtiene los datos para presentar en el modal al querer actualizar los datos
	*/
	modalActualizar(id){
		this.repuesto = _.findWhere(this.repuestos, {id: id});
	}

	/**
	* Elimina un repuesto
	*/
	deleteRepuesto(id){
		this._repuestoService.deleteRepuesto(id).subscribe(
			response=>{
				if(response.response == true){
					this.repuestos = _.without(this.repuestos, _.findWhere(this.repuestos, {
					  id: id
					}));
					this.toastr.success('Modelo eliminado exitosamente!', 'Exito!');
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
	* Obtiene los datos del archivo cargado para poder subirlo posteriormente.
	*/
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}