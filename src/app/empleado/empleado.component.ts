import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Empleado} from './empleado';
import { EmpleadoService } from '../services/empleado.service';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
declare var jQuery:any;

/**
*Componente que permite crear cuentas de usuario y administrarlas.
*/
@Component({
	selector: 'empleado',
	templateUrl: './empleado.component.html',
	providers:[EmpleadoService]
})

export class EmpleadoComponent{
	public empleado:Empleado;
	public empleados:Empleado[];

	public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "nombre";
    public sortOrder = "asc";


	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _empleadoService: EmpleadoService,
		public toastr: ToastsManager, 
		vcr: ViewContainerRef
		) {
		this.empleado = new Empleado(0,"","","",1,"","");
		this.toastr.setRootViewContainerRef(vcr);
	}

	/**
	* Guarda los datos del empleado 
	*/
	onSubmit(){
		
		if(this.empleado.id === 0){
			this.empleado = _.omit(this.empleado, 'id');
			
		}

		if(this.empleado.id === 0 || !this.empleado.id){
			if(this.empleado.pass === ""){
				this.empleado = _.omit(this.empleado, 'pass');
				
			}
		}
		jQuery("#ModalEmpleado").modal("hide");
		this._empleadoService.addEmpleado(this.empleado).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Empleado guardado exitosamente!', 'Exito!');
					this.empleado = new Empleado(0,"","","",1,"","");
					this.obtenerEmpleados();
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
		this.obtenerEmpleados();
	}

	/**
	* Obtiene todos los empleados
	*/
	obtenerEmpleados(){
		this._empleadoService.getEmpleado().subscribe(
			result=>{	
				this.empleados= result.result;
				
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
		this.empleado = _.findWhere(this.empleados, {id: id});
	}

	/**
	* Elimina una marca
	*/
	deleteMarca(id){
		this._empleadoService.deleteEmpleado(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.empleados = _.without(this.empleados, _.findWhere(this.empleados, {
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

