import {Injectable} from '@angular/core';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../services/api.service';
import {catchError} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FavoritesService {
	public favoritesList: BehaviorSubject<IMenuLink[]> = new BehaviorSubject<IMenuLink[]>(null);
	public favoriteLoaded: Subject<void> = new Subject();
	public favoriteLoad: Subject<void> = new Subject<void>();

	constructor(private http: HttpClient, private apiService: ApiService) {
	}

	getFavorites = () => {
		this.apiService.getEndpoints(endpoints => this.http.get(endpoints.favorites)
			.pipe(
				catchError((error) => {
					if (error.status !== 204) {
						console.log('error to get favorites, status code: ' + error.status);
					}
					return of([]);
				})
			)
			.subscribe((result: IMenuLink[]) => {
				result.forEach(r => r.isFavorite = true);
				this.favoritesList.next(result);
			}));
	}


	errorCatchHandler(action: string, errorStatus: number, expectedStatus: number, link: IMenuLink): number {
		let response: number;
		if (errorStatus !== expectedStatus) {
			link.isFavorite = false;
			console.log('error to ' + action + ' favorites, status code: ' + expectedStatus);
			response = errorStatus;
		} else {
			response = expectedStatus;
		}
		return response;
	}


	favoriteResponseHandler(statusCode: number, expectedStatus: number, link: IMenuLink, isFavorite: boolean): void {
		link.isFavorite = (statusCode || statusCode === 0) && statusCode !== expectedStatus ? !isFavorite : isFavorite;
		link.isLocked = false;
	}

	addFavorite(link: IMenuLink): void {
		this.apiService.getEndpoints(endpoints => {
			this.http.post(endpoints.favorites, link.id)
				.pipe(
					catchError((error) => {
						return of(this.errorCatchHandler('add', error.status, 201, link));
					})
				)
				.subscribe((statusCode: number) => {
					this.favoriteResponseHandler(statusCode, 201, link, true);
				});
		});
	}

	removeFavorite(link: IMenuLink): void {
		this.apiService.getEndpoints(endpoints => {
			this.http.request('DELETE', endpoints.favorites + '/' + link.id)
				.pipe(
					catchError((error) => {
						return of(this.errorCatchHandler('remove', error.status, 204, link));
					})
				)
				.subscribe((statusCode: number) => {
					this.favoriteResponseHandler(statusCode, 204, link, false);
				});
		});
	}

	favoriteImgSrc(isFavorite: boolean): string {
		let favoriteIcon: string = '';
		const favoriteIconPath: string = 'assets/icons/images/';
		if (isFavorite) {
			favoriteIcon = 'favorites_on.jpg';
		} else {
			favoriteIcon = 'favorites_off.jpg';
		}
		return favoriteIconPath + favoriteIcon;
	}

	favoriteClick(link: IMenuLink): void {
		if (!link.isLocked) {
			link.isLocked = true;
			const isFavorite: boolean = link.isFavorite === undefined ? true : !link.isFavorite;
			if (isFavorite) {
				this.addFavorite(link);
			} else {
				this.removeFavorite(link);
			}
		}
	}
}
