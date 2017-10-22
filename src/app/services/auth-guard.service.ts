import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

/**
* Servicio que vigila que el usuario pueda o no ingresar a alguna ruta.
*/
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
	/**
	* Función que permite o no el acceso a la página solicitada. En caso que no tenga acceso, envía a la página definida para este caso.
	*/
	  canActivate() {
	    if(this.auth.loggedIn()) {
	      return true;
	    } else {
	      this.router.navigate(['unauthorized']);
	      return false;
	    }
	  }
}