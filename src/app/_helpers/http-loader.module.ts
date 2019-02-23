import { HttpInterceptorService, HttpInterceptorServiceFactoryProvider } from '../_services/http-interceptor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
	declarations: [
		// SpinnerComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		// SpinnerComponent
	],
	providers: [
		// SpinnerService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		},
		HttpInterceptorServiceFactoryProvider
	]
})
export class NgHttpLoaderModule {
}
