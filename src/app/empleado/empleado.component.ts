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
	public Listtipo:Array<Tipoequipo>;


	constructor() {
		this.empleado = new Empleado(0,"","","",0,"","");
		this.Listtipo = [
			new Tipoequipo(1,'Administrador'),
			new Tipoequipo(2,'Técnico'),
			new Tipoequipo(3,'Otro')
			];
	}
	onSubmit(){
		console.log(this.empleado);
	}
}

