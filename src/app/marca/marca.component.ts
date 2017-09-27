import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MarcaService} from '../services/marca.service';
import {Marca} from '../marca/marca';

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
  public sortBy = "name";
  public sortOrder = "asc";

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _marcaService: MarcaService
		) {
		this.marca = new Marca(0,"");
	}
	onSubmit(){
		
	}
	ngOnInit(){
		//alert(this._marcaService.getMarca());
		this._marcaService.getMarca().subscribe(
			result=>{	
				this.marcas= result.result;
			},
			error=>{
				console.log(<any>error);
			}
			);
	}
}

