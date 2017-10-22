/**
* Clase de la clase Torpedo. Son los apuntes que se pueden agregar a cada modelo de equipo.
*/
export class Torpedo{
	/**
	* Constructor con las propiedades de la clase
	*/
	constructor(
		public id:number, 
		public titulo:string,
		public descripcion:string,
		public url:string,
		public idModelo:number
		){		
	}
}