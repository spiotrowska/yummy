import { JwtUserModel } from './../_models/jwt-user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtUserService {
  public currentUser: JwtUserModel;

  constructor() {
  }

  get jtwUser() {
    return this.currentUser;
  }

  setJwtUser(jwtUser: JwtUserModel) {
    this.currentUser = jwtUser;
  }

  parseJwt(token: string): JwtUserModel {
    // TODO
		const base64Url = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJlNjUyNzE4NC1jMTA3LTQyYmMtOGE3ZS0yZGU3OTgyOTVlMWQiLCJFbWFpbCI6Im1hdGV1c3p3b2NobmlhazAxMEBnbWFpbC5jb20iLCJGaXJzdE5hbWUiOiJNYXRldXN6IiwiTGFzdE5hbWUiOiJXb2NobmlhayIsIkV4cCI6IjIwMTktMDItMjNUMTI6NTc6MTQuNjI3NTIwMVoifQ.Bj7H5Ud4A9kMHo90ZNmHuPa8PuN1aKIrUxISy_EkjJE'.split('.')[1];
		if (base64Url) {
			const base64 = base64Url.replace('-', '+').replace('_', '/');
			return JSON.parse(window.atob(base64));
		} else {
			return null;
		}
	}
}
