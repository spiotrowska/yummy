import { UserModel } from './../_models/user.model';
import { Router } from '@angular/router';
import { AuthUserModel } from '../_models/auth-user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthUserService {
  private authUser: AuthUserModel;

  constructor(private router: Router) {
      this.authUser = new AuthUserModel();
    }

  get isUserLogged(): boolean {
    return this.authUser.isLogged;
  }

  authorizeUser(token: string) {
    this.authUser.token = token;
		this.authUser.isLogged = true;
    const jwtUser = this.parseJwt(token);
    console.log(jwtUser);
		// TODO this.userIdentityService.setUserIdentity(jwtUser);
		this.rememberAuthUser(this.authUser, true);
  }

  private rememberAuthUser(user: AuthUserModel, rememberMe: boolean): void {
		if (rememberMe) {
      localStorage.setItem('user-token', user.token);
		} else {
			sessionStorage.setItem('user-token', user.token);
		}
  }

  private parseJwt(token: string): UserModel {
    // TODO
    console.log('token:' + token);
    return {userId: '1', email: 'sw@gmail.com', firstName: 's', lastName: 'w', Exp: new Date()};

		// const base64Url = token.split('.')[1];
		// if (base64Url) {
		// 	const base64 = base64Url.replace('-', '+').replace('_', '/');
		// 	return JSON.parse(window.atob(base64));
		// } else {
		// 	return null;
		// }
	}

}
