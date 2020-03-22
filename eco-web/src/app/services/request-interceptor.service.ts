import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service'
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

	constructor(private authService: AuthenticationService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		// add a custom header
		let customReq;
		if (this.authService.getToken() && this.authService.getToken() != null) {
			customReq = request.clone({
				headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
			});
			// pass on the modified request object
			return next.handle(customReq);
		}
		return next.handle(request);
	}
}
