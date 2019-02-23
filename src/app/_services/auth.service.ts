import { BaseReturnModel } from './../_models/base-return.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserModel } from '../_models/login-user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {
	}

	authenticateUser(user: LoginUserModel): Observable<{ token: string }> {
		return this.http.post<{ token: string }>('https://reqres.in/api/login', user, { withCredentials: false });
  }

}
