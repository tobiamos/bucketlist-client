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
  getOptions() {
    return  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${this.loadToken()}`
      })
    };
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
  register(data) {
    return this.http.post(`${BASEURL}/auth/register`, data);
  }
  getBucketLists() {
    return this.http.get(`${BASEURL}/bucketlists`, this.getOptions());
  }
  createBucketList(data) {
    return this.http.post(`${BASEURL}/bucketlists`, data, this.getOptions());
  }
  getItems(id) {
    return this.http.get(`${BASEURL}/bucketlists/${id}/items`, this.getOptions());
  }
  createItem(data, id) {
    return this.http.post(`${BASEURL}/bucketlists/${id}/items`, data, this.getOptions());
  }
  deleteItem(id, itemId) {
    return this.http.delete(`${BASEURL}/bucketlists/${id}/items/${itemId}`, this.getOptions());
  }
  updateItem(id, itemId, data) {
    return this.http.put(`${BASEURL}/bucketlists/${id}/items/${itemId}`, data, this.getOptions());
  }
}
