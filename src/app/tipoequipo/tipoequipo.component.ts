import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TipoequipoService} from '../services/tipoequipo.service';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
declare var jQuery:any;

/**
* Componente que administra la información de la tabla TipoEquipo
*/
@Component({
	selector: 'tipoequipo',
	templateUrl: './tipoequipo.component.html',
	providers: [TipoequipoService]
})

export class TipoequipoComponent{
	public tipoequipo:Tipoequipo;
	public tipoequipos:Tipoequipo[];
	public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "nombre";
  public sortOrder = "asc";
  

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _tipoequipoService: TipoequipoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		) {
		this.tipoequipo = new Tipoequipo(0,"");
		this.toastr.setRootViewContainerRef(vcr);
	}
	
	/**
	* Guarda los datos del tipo de equipo
	*/
	onSubmit(){
		if(this.tipoequipo.id === 0){
			this.tipoequipo = _.omit(this.tipoequipo, 'id');
		}
		jQuery("#tipoequipoModal").modal("hide");
		this._tipoequipoService.addTipoEquipo(this.tipoequipo).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Tipo de equipo guardado exitosamente!', 'Exito!');
					this.tipoequipo = new Tipoequipo(0,"");
					this.obtenerTipoequipos();
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
	* Ejecuta las funciones necesarias al iniciar el componente
	*/
	ngOnInit(){
		this.obtenerTipoequipos();
	}

	/**
	* Obtiene todos los tipos de equipos
	*/
	obtenerTipoequipos(){
		this._tipoequipoService.getTipoEquipo().subscribe(
			result=>{	
				this.tipoequipos= result.result;	
				
				},
			error=>{
				console.log(<any>error);
				}
			);
	}
	/**
	* Abre el modal para actualizar el tipo de equipo seleccionado
	*/
	modalActualizar(id){
		this.tipoequipo = _.findWhere(this.tipoequipos, {id: id});
	}

	/**
	* Elimina un tipo de equipo
	*/
	deleteTipoequipo(id){
		let listanueva:Tipoequipo[];
		this._tipoequipoService.deleteTipoEquipo(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.tipoequipos = _.without(this.tipoequipos, _.findWhere(this.tipoequipos, {
					  id: id
					}));
					
					this.toastr.success('Tipo de equipo eliminado exitosamente!', 'Exito!');
					
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

