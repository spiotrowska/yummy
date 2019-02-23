import { JwtUserService } from './jwt-user.service';
import { Router } from '@angular/router';
import { AuthUserModel } from '../_models/auth-user.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class AuthUserService {
  private authUser: AuthUserModel;

  constructor(
    private router: Router,
    private jwtUserService: JwtUserService) {
      this.authUser = new AuthUserModel();
    }

  get isUserLogged(): boolean {
    return this.authUser.isLogged;
  }

  authorizeUser(token: string) {
    this.authUser.token = token;
		this.authUser.isLogged = true;
    const jwtUser = this.jwtUserService.parseJwt(token);
    this.jwtUserService.setJwtUser(jwtUser);
		this.rememberAuthUser(this.authUser, true);
  }

  private rememberAuthUser(user: AuthUserModel, rememberMe: boolean): void {
		if (rememberMe) {
      localStorage.setItem('user-token', user.token);
		} else {
			sessionStorage.setItem('user-token', user.token);
    }
  }

  logInUserBasedOnMemory() {
    const userTokenFromMemory = this.getUserTokenFromMemory();
    if (!!userTokenFromMemory) {
			this.authorizeUser(userTokenFromMemory );
		} else {
			this.logOutUser();
		}
  }

  logOutUser() {
    this.clearAuthUser();
    this.clearStorage();
    this.router.navigate(['/']);
  }

  getUserTokenFromMemory() {
    const token = localStorage.getItem('user-token') || sessionStorage.getItem('user-token');
    if (!token || this.checkTokenExpired(token)) {
			return null;
		}
		return token;
  }

  checkTokenExpired(token: string): boolean {
    const jwtUser = this.jwtUserService.parseJwt(token);
    console.log(jwtUser);
    if (moment(jwtUser.Exp).isBefore()) {
      this.clearAuthUser();
      this.clearStorage();
      return true;
    } else {
      return false;
    }
  }

  private clearAuthUser() {
    delete this.authUser.token;
		this.authUser.isLogged = false;
  }

  private clearStorage() {
		sessionStorage.clear();
		localStorage.clear();
	}

}
