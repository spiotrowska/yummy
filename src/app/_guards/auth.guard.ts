import { AuthUserService } from './../_services/auth-user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authUserService: AuthUserService) {
  }

  canActivate() {
    if (this.authUserService.isUserLogged) {
      return true;
    }

    this.authUserService.logInUserBasedOnMemory();
		return this.authUserService.isUserLogged;
  }

}
