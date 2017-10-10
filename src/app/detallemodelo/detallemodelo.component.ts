import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ModeloService} from '../services/modelo.service';
import {ManualService} from '../services/manual.service';
// import {TipoequipoService} from '../services/tipoequipo.service';
import {Modelo} from '../modelo/modelo';
import {Manual} from '../manual/manual';

@Component({
  selector: 'detallemodelo',
  templateUrl: './detallemodelo.component.html',
  styleUrls: ['./detallemodelo.component.css'],
  providers: [ModeloService, ManualService]
})
export class DetallemodeloComponent {
	public modelo:Modelo;
	public manuales:Manual;

  	constructor(
  		private _modeloService:ModeloService,
  		private _manualService:ManualService,
  		private _route: ActivatedRoute,
		private _router:Router
		) { }

  	ngOnInit() {
		this.getModelo();
		this.obtenerManuales();
	}

	getModelo(){
		this._route.params.forEach((params:Params) =>{
			let id = params['id'];
			//alert (id);
			this._modeloService.getModelo1(id).subscribe(
				response =>{
					if(response.response == true){
						this.modelo = response.result;
						console.log(this.modelo);
					}else{
						this._router.navigate(['manualuser']);
					}
				},
				error=>{
					console.log(<any>error)
				})
		})
	}

	obtenerManuales(){
			this._manualService.getManual().subscribe(
				result=>{	
					this.manuales= result.result;
					console.log(result);
					},
				error=>{
					console.log(<any>error);
					}
				);
		}
}
