import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { CheckResponse, IAuth, UserInfo} from '../models/common';

@Injectable()
export class AuthService {

  public host = 'http://api.techuni.lo/';
  public token: string;

  public DEGREES = ['бакалавр', 'магистр', 'PhD'];
  public TYPES = ['рӯзона', 'ғоибона', 'фосилавӣ'];

  constructor(public http: HttpClient) {}

  checkUserSession(user: UserInfo) {
    const body = new HttpParams()
      .set('uid', user.userId.toString())
      .set('type', user.type)
      .set('time', user.time)
      .set('route', 'authsess')
      .set('operation', 'custom')
      .set('action', 'check')
      .set('token', this.token);

    return this.http.post(this.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: CheckResponse) => {
      return response;
    });
  }

  getToken(username: string, password: string): Observable<boolean> {
    return this.http.get(
      this.host + 'self.php?route=auth&operation=login&username=' + username + '&password=' + password
    ).map((response: IAuth) => {
      const token = response.data.hash;
      if (token) {
        // set token property
        this.token = token;
        console.log(token);

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }
    });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
