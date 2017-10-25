import {Component} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import * as moment from 'moment';
import { AuthModule } from '../auth/auth.module';

/**
	* Componente para controlar la información de la barra superior de la pantalla.
	*/
@Component({
	selector: 'navbar',
	templateUrl:'./navbar.component.html',
  styleUrls: ['./navbar.component.css']
	
})

export class NavbarComponent{
	
	public item1 ="Manuales";
	public item2 ="Protocolos";
	public item3 ="Apuntes";
	public logueado:boolean;

	/**
	* Ejecuta las funciones necesarias al inicio del componente
	*/
	ngOnInit(){
		this.logged();
	}

	/**
	* Función para obtener true o false, dependiendo si se está logueado o no
	*/
	logged(){
		let currentDate = moment().format("X");
		
		//Si no hay datos de login
		if(localStorage.getItem('token') == '' || currentDate >= localStorage.getItem('exp') || localStorage.getItem('exp') == ''){
			return false;	
		}else{
			return true;
		}
	}

	/**
	* Limpia los datos del localStorage para permitir cerrar sesión
	*/
	logout(){
		localStorage.setItem('token','');
		localStorage.setItem('exp','');
		localStorage.setItem('user','');
	}
	
}