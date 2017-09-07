import {Component} from '@angular/core';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {Marca} from '../marca/marca';
import {Modelo} from '../modelo/modelo';

 
@Component({
	selector: 'sidebar',
	templateUrl:'./sidebar.component.html'
	
})

export class SidebarComponent{
	
	public Listtipo:Array<Tipoequipo>;
	public Listmarca:Array<Marca>;
	public Listmodelo:Array<Modelo>;

	constructor(){
		this.Listtipo = [
			new Tipoequipo(1,'Monitor multiparámetros'),
			new Tipoequipo(2,'Ecógrafo'),
			new Tipoequipo(3,'Máquina anestesia'),
			new Tipoequipo(4,'Otro')
			];
		this.Listmarca = [
			new Marca(1,'Siemens'),
			new Marca(2,'GE'),
			new Marca(3,'Drager'),
			new Marca(4,'Otro')
			];
		this.Listmodelo = [
			new Modelo(1,'Modelo1', '1.jpg', 3, 3),
			new Modelo(2,'Modelo2', '2.jpg', 2, 1),
			new Modelo(3,'Modelo3', '3.jpg', 3, 2),
			new Modelo(4,'Otro', '9.jpg', 6, 3)
			];
	}

	ngOnInit(){
		console.log(this.Listmodelo);
	}
}