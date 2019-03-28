import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import * as jwtHandler from 'jwt-client';

import {Observable} from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private urlsNotIntercept: string[] = []) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const toSkip = this.urlsNotIntercept.filter(urlToSkip => req.url.includes(urlToSkip)).length > 0;
		if (toSkip) {
			return next.handle(req);
		}
		const authToken = jwtHandler.get();

		const authReq = req.clone({
			headers: req.headers.set('Authorization', 'Bearer ' + authToken)
		});
		return next.handle(authReq);
	}
}
