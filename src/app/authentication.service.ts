import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  header: HttpHeaders;
  jwt = undefined;
  constructor(public http: HttpClient) { }
  authenticate(credentials) {

    const url = `${environment.apiUrl}/api/authenticate`;
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    return this.http.post(url, credentials, {headers: {skip:'true'}});
  }
}
