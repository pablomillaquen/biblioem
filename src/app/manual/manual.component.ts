import {Component} from '@angular/core';
import {Tipoequipo} from '../tipoequipo/tipoequipo';
import {Marca} from '../marca/marca';
import {Modelo} from '../modelo/modelo';
import {Manual} from './manual';

 
@Component({
	selector: 'manual',
	templateUrl:'./manual.component.html'
	
})

export class ManualComponent{
	public manual:Manual;
	public selectedModel:Modelo;
	public selectedMark:Marca;
	public selectedType:Tipoequipo;
	public Listtipo:Array<Tipoequipo>;
	public Listmarca:Array<Marca>;
	public Listmodelo:Array<Modelo>;
	public SelFisico:Boolean;

	constructor(){
		
		this.manual = new Manual(0,"",0,"","",0);

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
		this.SelFisico = true;
	}

	ngOnInit(){
		console.log(this.Listmodelo);
	}

  SeleccionarModelo(event:string): void{
    this.selectedModel = JSON.parse(event);
    console.log(this.selectedModel);
  }

  SeleccionarMarca(event:string): void{
    this.selectedMark = JSON.parse(event);
    console.log(this.selectedMark);
  }

  SeleccionarTipo(event:string): void{
    this.selectedType = JSON.parse(event);
    console.log(this.selectedType);
  }

  CambiarFisico(event:string): void{
    this.SelFisico = JSON.parse(event);
    console.log(this.selectedType);
  }
}