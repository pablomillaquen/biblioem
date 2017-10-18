import * as _ from "lodash";
import { Pipe, PipeTransform } from '@angular/core';

	/**
	* Permite utilizar el buscador superior en la tabla Tipo de Equipo
	*/
@Pipe({
  name: 'tipoequipoFilter'
})
export class TipoequipoFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
		if(query){
	    	return _.filter(array, row => (row.nombre).toLowerCase().indexOf(query) > -1);
	    }

	    return array;
	}

}
