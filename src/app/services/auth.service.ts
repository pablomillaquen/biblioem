import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';


/**
* Permite revisar si existe o no un token no expirado
*/
@Injectable()
export class AuthService {

  constructor() { }
  /**
	* Devuelve true si existe un token no expirado y false en caso contrario
	*/
  loggedIn() {
  	return tokenNotExpired();
	}
}





