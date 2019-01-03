import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as jwtHandler from 'jwt-client';
import {UserDetails} from '../modules/mainHeaderModule/user-details';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$: BehaviorSubject<any>;
  public logout$: Subject<any>;
  private userDetails: UserDetails;
  private GET_TOKEN_URL = 'https://auth.hotelbeds.com/oauth/token';


  constructor(public http: HttpClient, private apiService: ApiService) {
    this.isAuthenticated$ = new BehaviorSubject(null);
    this.logout$ = new Subject();

    this.isAuthenticated$.next(!!this.getToken());
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

  public isAuthenticated() {
    return !!this.getToken();
  }

  login({username, password}): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YXRsYXMtcGx1czphdGxhcy1wbHVz'
    });

    let options = {headers: headers};

    const url = `${this.GET_TOKEN_URL}?grant_type=password&password=${password}&username=${username}`;
    return this.http.post(url, null, options)
      .pipe(
        tap((result: any) => {
            if (result && result.access_token) {
              this.saveToken(result.access_token)
            }
          },
        ))
  }

  public logout(skipBroadcast?: boolean): void {
    jwtHandler.forget();
    if (!skipBroadcast) {
      this.isAuthenticated$.next(false);
      this.logout$.next();
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
