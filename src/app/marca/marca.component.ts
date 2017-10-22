import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MarcaService} from '../services/marca.service';
import {Marca} from '../marca/marca';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
declare var jQuery:any;

/**
* Componente que administra la información de la tabla Marca
*/
@Component({
	selector: 'marca',
	templateUrl: './marca.component.html',
	providers: [MarcaService]
})

export class MarcaComponent{
	public marca:Marca;
	public marcas:Marca[];
	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "nombre";
    public sortOrder = "asc";
  

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _marcaService: MarcaService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		) {
		this.marca = new Marca(0,"");
		this.toastr.setRootViewContainerRef(vcr);
	}
	
	/**
	* Guarda los datos de la marca
	*/
	onSubmit(){
		if(this.marca.id === 0){
			this.marca = _.omit(this.marca, 'id');
		}
		jQuery("#MarcaModal").modal("hide");
		this._marcaService.addMarca(this.marca).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Marca guardada exitosamente!', 'Exito!');
					this.marca = new Marca(0,"");
					this.obtenerMarcas();
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
		this.obtenerMarcas();
	}

	/**
	* Obtiene todas las marcas
	*/
	obtenerMarcas(){
		this._marcaService.getMarca().subscribe(
			result=>{	
				this.marcas= result.result;
				
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

	/**
	* Abre el modal para actualizar la marca seleccionada
	*/
	modalActualizar(id){
		this.marca = _.findWhere(this.marcas, {id: id});
	}

	/**
	* Elimina una marca
	*/
	deleteMarca(id){
		let listanueva:Marca[];
		this._marcaService.deleteMarca(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.marcas = _.without(this.marcas, _.findWhere(this.marcas, {
					  id: id
					}));
					
					this.toastr.success('Marca eliminada exitosamente!', 'Exito!');
					
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

