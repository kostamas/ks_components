import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {PopupService} from '../modules/popup-module/popup.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IPopupData} from '../types/modal';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private urlsNotIntercept: string[] = [], private popupService: PopupService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const toSkip = this.urlsNotIntercept.filter(urlToSkip => req.url.includes(urlToSkip)).length > 0;

		if (toSkip) {
			return next.handle(req);
		} else {
			return next.handle(req).pipe(
				catchError((err): Observable<any> => {
					const errorPopupData: IPopupData = {
						title: 'Error',
						content: `<div>Error: ${err.error && err.error.error ? err.error.error : ''}</div>
											<div>Description: ${err.error && err.error.error_description ? err.error.error_description : ''}</div>
											<div>Url: ${err.url}</div>
											<div>Message: ${err.message}</div>
											<div>Status: ${err.status}</div>`,
						buttons: [{text: 'OK', handler: closeFn => closeFn()}]
					};
					this.popupService.showError(errorPopupData);
					throw(err);
				})
			);
		}

	}
}
