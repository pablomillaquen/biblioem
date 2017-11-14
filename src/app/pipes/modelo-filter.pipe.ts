import * as _ from "lodash";
import { Pipe, PipeTransform } from '@angular/core';

	/**
	* Permite utilizar el buscador superior en la tabla Modelo
	*/
@Pipe({
  name: 'modeloFilter'
})
export class ModeloFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
		if(query){
	    	return _.filter(array, row => (row.modelo).toLowerCase().indexOf(query) > -1);
	    }

	    return array;
	}

}
