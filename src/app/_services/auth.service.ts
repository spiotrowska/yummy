import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserModel } from '../_models/login-user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {
	}

	authenticateUser(user: LoginUserModel): Observable<string> {
		return this.http.post('auth/login', user, { withCredentials: false, responseType: 'text' });
	}

}
