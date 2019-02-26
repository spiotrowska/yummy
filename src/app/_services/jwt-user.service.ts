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
		const base64Url = token.split('.')[1];
		if (base64Url) {
			const base64 = base64Url.replace('-', '+').replace('_', '/');
			return JSON.parse(window.atob(base64));
		} else {
			return null;
		}
	}
}
