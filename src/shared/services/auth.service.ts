import {Inject, Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as jwtHandler from 'jwt-client';
import {UserDetails} from '../modules/mainHeaderModule/user-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {IAuthConfig} from '../types/auth';

export const AuthConfig = new InjectionToken<any>(null);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$: BehaviorSubject<any>;
  public logout$: Subject<any>;
  private userDetails: UserDetails;
  private GET_TOKEN_URL: string = 'https://auth.hotelbeds.com/oauth/token';


  constructor(public http: HttpClient, private apiService: ApiService, public router: Router,
              @Inject(AuthConfig) public authConfig: IAuthConfig) {
    this.isAuthenticated$ = new BehaviorSubject(null);
    this.logout$ = new Subject();
    this.isAuthenticated$.next(this.isAuthenticated());
  }

  public getToken(): string {
    return jwtHandler.get();
  }

  public saveToken(token: string): void {
    const isTokenValid = this.isTokenValid(token);
    if (!isTokenValid) {
      return;
    }
    jwtHandler.keep(token);
    this.isAuthenticated$.next(true);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token && !this.isExpired(token);
  }

  login({username, password}: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YXRsYXMtcGx1czphdGxhcy1wbHVz'
    });

    const options: any = {headers: headers};

    const url = `${this.GET_TOKEN_URL}?grant_type=password&password=${password}&username=${username}`;
    return this.http.post(url, null, options)
      .pipe(
        tap((result: any) => {
            if (result && result.access_token) {
              this.saveToken(result.access_token);
            }
          },
        ));
  }

  public logout(): void {
    jwtHandler.forget();
    this.isAuthenticated$.next(false);
    this.userDetails = null;
    this.logout$.next();
    if (this.authConfig && this.authConfig.logoutFromHotelBeds) {
      const img = new Image();
      img.onerror = () => {
        this.router.navigate(['login']);
      };
      img.src = 'http://loginsis.hotelbeds.com//oam/server/logout';
    } else {
      this.router.navigate(['login']);
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      return jwtHandler.validate(token);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private isExpired(token: string): boolean {
    const decodedToken = jwtHandler.read(token);
    const expiration = decodedToken && decodedToken.claim && decodedToken.claim.exp;
    const fixedExpiration = Number(`${expiration}000`); // the expiration comes without milliseconds.
    return fixedExpiration ? moment(fixedExpiration).diff(moment()) < 0 : false;
  }

  getUserDetails(cb: any): void {
    if (this.userDetails) {
      return cb(this.userDetails);
    }
    this.apiService.getEndpoints((endpoints => {
      this.http.get(endpoints.userDetails).subscribe((response: UserDetails) => {
        this.userDetails = response;
        cb(this.userDetails);
      });
    }));
  }
}
