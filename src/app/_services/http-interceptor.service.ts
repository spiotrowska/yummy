import { environment } from './../../environments/environment';
import { AuthUserService } from './auth-user.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authUserService: AuthUserService) {
  }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const request = this.buildRequest(req);

      // TODO start spinner

      return next.handle(request)
			.catch((error, caught) => {
				this.handleError(error);
				return Observable.throw(error);
			})
			.finally(() => {
				// TODO stop spinner
			}) as any;
    }

    private buildRequest(request: HttpRequest<any>): HttpRequest<any> {
      const token = this.authUserService.getUserTokenFromMemory();
      return request.clone({
        url: `${environment.apiUrl}${request.url}`,
        // withCredentials: true,
        headers: !token ? request.headers : request.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    private handleError(error) {
      console.log(error);
      // TODO
    }
}

export function HttpInterceptorServiceFactory(authUserService: AuthUserService) {
	return new HttpInterceptorService(authUserService);
}

export let HttpInterceptorServiceFactoryProvider = {
	provide: HttpInterceptorService,
	useFactory: HttpInterceptorServiceFactory,
	deps: [AuthUserService]
};
