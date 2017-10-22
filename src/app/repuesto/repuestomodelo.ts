export class RepuestoModelo{

	/**
	* Clase que maneja los datos para manejar los datos de los repuestos asociados a los modelos.
	*/
	constructor(public id:number,
		public idRepuesto:number,
		public nombre:string,
		public referencia:string,
		public foto:string,
		public descripcion:string
		){
		
	}
}