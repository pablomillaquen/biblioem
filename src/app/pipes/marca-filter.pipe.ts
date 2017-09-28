import * as _ from "lodash";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marcaFilter'
})
export class MarcaFilterPipe implements PipeTransform {
	transform(array: any[], query: string): any {
		if(query){
	    	return _.filter(array, row => (row.MAR_nombre).toLowerCase().indexOf(query) > -1);
	    }

	    return array;
	}

}
