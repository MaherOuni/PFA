import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  header: HttpHeaders;
  jwt = undefined;
  constructor(public http: HttpClient) { }
  authenticate(credentials) {

    const url = '/api/authenticate';
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    return this.http.post(url, credentials, {headers: {skip:'true'}});
  }
}
