export class Empleado{

	/**
	* Clase para manejo de los datos, de la tabla Empleado
	*/
	constructor(
		public id:number,
		public nombre:string,
		public apellido:string,
		public correo:string,
		public acceso:number,
		public usuario:string,
		public pass:string
		){		
	}
}