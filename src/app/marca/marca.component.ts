import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MarcaService} from '../services/marca.service';
import {Marca} from '../marca/marca';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
declare var jQuery:any;

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
  public sortBy = "MAR_nombre";
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
	
	onSubmit(){
		console.log(this.marca);
		if(this.marca.id === 0){
			this.marca = _.omit(this.marca, 'id');
			console.log(this.marca);
		}
		jQuery("#MarcaModal").modal("hide");
		this._marcaService.addMarca(this.marca).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Marca guardada exitosamente!', 'Exito!');
					this.marca = new Marca(0,"");
					this.obtenerMarcas();
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
		//alert(this._marcaService.getMarca());
		this.obtenerMarcas();
	}

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

	modalActualizar(id){
		console.log(id);
		this.marca = _.findWhere(this.marcas, {MAR_id: id});
		console.log(this.marca);
	}
}

