import {Component} from '@angular/core';
import {Marca} from './marca';

@Component({
	selector: 'marca',
	templateUrl: './marca.component.html'
})

export class MarcaComponent{
	public marca:Marca;


	constructor() {
		this.marca = new Marca(0,"");
	}
	onSubmit(){
		console.log(this.marca);
	}
}

