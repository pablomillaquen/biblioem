import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TipoequipoService} from '../services/tipoequipo.service';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
declare var jQuery:any;

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
	
	onSubmit(){
		console.log(this.tipoequipo);
		if(this.tipoequipo.id === 0){
			this.tipoequipo = _.omit(this.tipoequipo, 'id');
			console.log(this.tipoequipo);
		}
		jQuery("#tipoequipoModal").modal("hide");
		this._tipoequipoService.addTipoEquipo(this.tipoequipo).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Tipoequipo guardada exitosamente!', 'Exito!');
					this.tipoequipo = new Tipoequipo(0,"");
					this.obtenerTipoequipos();
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
	ngOnInit(){
		//alert(this._tipoequipoService.gettipoequipo());
		this.obtenerTipoequipos();
	}

	obtenerTipoequipos(){
		this._tipoequipoService.getTipoEquipo().subscribe(
			result=>{	
				this.tipoequipos= result.result;	
				console.log(result);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}

	modalActualizar(id){
		this.tipoequipo = _.findWhere(this.tipoequipos, {id: id});
	}

	deleteTipoequipo(id){
		let listanueva:Tipoequipo[];
		this._tipoequipoService.deleteTipoEquipo(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.tipoequipos = _.without(this.tipoequipos, _.findWhere(this.tipoequipos, {
					  id: id
					}));
					console.log(this.tipoequipos);
					this.toastr.success('Tipoequipo eliminada exitosamente!', 'Exito!');
					
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
}

