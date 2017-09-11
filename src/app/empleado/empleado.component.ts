import {Component} from '@angular/core';
import {Empleado} from './empleado';
import {Tipoequipo} from '../tipoequipo/tipoequipo';


@Component({
	selector: 'empleado',
	templateUrl: './empleado.component.html'
})

export class EmpleadoComponent{
	public empleado:Empleado;
	public selectedType:Tipoequipo;

	constructor() {
		this.empleado = new Empleado(0,"","","",0,"");
		this.Listtipo = [
			new Tipoequipo(1,'Monitor multiparámetros'),
			new Tipoequipo(2,'Ecógrafo'),
			new Tipoequipo(3,'Máquina anestesia'),
			new Tipoequipo(4,'Otro')
			];
	}
	onSubmit(){
		console.log(this.empleado);
	}
}

