import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TokenHelper } from './helper';


const BASEURL = `${environment.apiUrl}`;
const helper = new TokenHelper();
@Injectable()


export class AuthService {
  public authToken: string;
  constructor(private http: HttpClient) {
  }
  loggedIn() {
    return helper.isTokenExpired(this.loadToken(), 0);
  }
  storeUserData(token) {
    localStorage.setItem('token', token);
    this.authToken = token;
  }
  userLogout() {
    this.authToken = null;
    localStorage.clear();
  }
  loadToken() {
    return localStorage.getItem('token');
  }
  login(data) {
    return this.http.post(`${BASEURL}/auth/login`, data);
  }
}
