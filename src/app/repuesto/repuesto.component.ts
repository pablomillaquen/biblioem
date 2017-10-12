import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {RepuestoService} from '../services/repuesto.service';
// import {MarcaService} from '../services/marca.service';
//import {TipoequipoService} from '../services/tipoequipo.service';
import {Repuesto} from '../repuesto/repuesto';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import * as _ from 'underscore';
import { GLOBAL } from '../services/global';
declare var jQuery:any;

// import {Tipoequipo} from '../tipoequipo/tipoequipo';
// import {Marca} from '../marca/marca';

 
@Component({
	selector: 'repuesto',
	templateUrl:'./repuesto.component.html',
	providers: [RepuestoService]
})

export class RepuestoComponent{
	
	
	//public Listmarca:Array<Marca>;
	//public Listmarcas:Marca[];
	//public Listtipo:Tipoequipo[];
	//public Listmodelo:Array<Modelo>;
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
		
		this.repuesto = new Repuesto(0,'','', GLOBAL.defaultImage);
		this.toastr.setRootViewContainerRef(vcr);

		// this.Listtipo = [
		// 	new Tipoequipo(1,'Máquina anestesia'),
		// 	new Tipoequipo(2,'Ecógrafo'),
		// 	new Tipoequipo(3,'Monitor multiparámetros'),
		// 	new Tipoequipo(4,'Otro')
		// 	];
		// this.Listmarca = [
		// 	new Marca(1,'Siemens'),
		// 	new Marca(2,'GE'),
		// 	new Marca(3,'Drager'),
		// 	new Marca(4,'Otro')
		// 	];
		// this.Listmodelo = [
		// 	new Modelo(1,'Modelo1', '1.jpg', 3, 3),
		// 	new Modelo(2,'Modelo2', '2.jpg', 2, 1),
		// 	new Modelo(3,'Modelo3', '3.jpg', 3, 2),
		// 	new Modelo(4,'Otro', '9.jpg', 6, 3)
		// 	];
	}
	onSubmit(){

		console.log(this.repuesto);
		if(this.repuesto.id === 0){
			this.repuesto = _.omit(this.repuesto, 'id');
			console.log(this.repuesto);
		}
		jQuery("#RepuestoModal").modal("hide");

		if(this.filesToUpload && this.filesToUpload.length>=1){
			console.log(this.filesToUpload);
			this._repuestoService.makeFileRequest(GLOBAL.url+'admin/repuesto/upload-file',[],this.filesToUpload)
		.then(
			(result)=>{
				//console.log(result);
				this.resultUpload = result['result'];
				//this.resultUpload = result.result;
				console.log(this.resultUpload);
				this.repuesto.foto = this.resultUpload;
				console.log(this.repuesto);
				this.saveRepuesto();
			},
			(error)=>{
				console.log(<any>error);
			});
		}else{
			this.saveRepuesto();
		}
		
	}

	ngOnInit(){
		//console.log(this.Listmodelo);
		this.obtenerRepuestos();
		//this.obtenerMarcas();
		//this.obtenerTipos();
	}

	saveRepuesto(){
		this._repuestoService.addRepuesto(this.repuesto).subscribe(
			response=>{
				if(response.response == true){
					
					this.toastr.success('Repuesto guardado exitosamente!', 'Exito!');
					//this.repuesto = new Modelo(0,"");
					this.obtenerRepuestos();
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
  // SeleccionarModelo(event:string): void{
  //   this.modelo.idTipo = JSON.parse(event);
  //   //console.log(this.modelo);
  // }

  // SeleccionarMarca(event:string): void{
  //   this.modelo.idMarca = JSON.parse(event);
  //   //console.log(this.modelo);
  // }

  // SeleccionarTipo(event:string): void{
  //   this.modelo.idTipo = JSON.parse(event);
  //   //console.log(this.modelo);
  // }

 //    obtenerMarcas(){
	// 	this._marcaService.getMarca().subscribe(
	// 		result=>{	
	// 			this.Listmarcas= result.result;
	// 			//console.log(this.Listmarcas);
	// 			},
	// 		error=>{
	// 			console.log(<any>error);
	// 			}
	// 		);
	// }

	// obtenerTipos(){
	// 	this._tipoequipoService.getTipoEquipo().subscribe(
	// 		result=>{	
	// 			this.Listtipo= result.result;
	// 			//console.log(this.Listmarcas);
	// 			},
	// 		error=>{
	// 			console.log(<any>error);
	// 			}
	// 		);
	// }

    obtenerRepuestos(){
		this._repuestoService.getRepuesto().subscribe(
			result=>{	
				this.repuestos= result.result;
				console.log(result);
				},
			error=>{
				console.log(<any>error);
				}
			);
	}
	modalActualizar(id){
		this.repuesto = _.findWhere(this.repuestos, {id: id});
		console.log(this.repuesto);
	}

	deleteRepuesto(id){
		let listanueva:Repuesto[];
		this._repuestoService.deleteRepuesto(id).subscribe(
			response=>{
				if(response.response == true){
					
					this.repuestos = _.without(this.repuestos, _.findWhere(this.repuestos, {
					  id: id
					}));
					console.log(this.repuestos);
					this.toastr.success('Modelo eliminado exitosamente!', 'Exito!');
					
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