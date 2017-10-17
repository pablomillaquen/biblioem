import {Component} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import * as moment from 'moment';
import { AuthModule } from '../auth/auth.module';

@Component({
	selector: 'navbar',
	templateUrl:'./navbar.component.html'
	
})

export class NavbarComponent{
	
	public item1 ="Manuales";
	public item2 ="Protocolos";
	public item3 ="Apuntes";
	public logueado:boolean;

	ngOnInit(){
		this.logged();
	}

	logged(){
		//console.log(this.auth.loggedIn());
		let currentDate = moment().format("X");
		
		//Si no hay datos de login
		if(localStorage.getItem('token') == '' || currentDate >= localStorage.getItem('exp') || localStorage.getItem('exp') == ''){
			return false;	
		}else{
			return true;
		}
	}

	logout(){
		localStorage.setItem('token','');
		localStorage.setItem('exp','');
		localStorage.setItem('user','');
	}
	
}