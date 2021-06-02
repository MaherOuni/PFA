import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  header: HttpHeaders;

  constructor(public http : HttpClient,private auth:AuthenticationService) { }

  getAllUsers()
  {
    let url = '/rest/user/all';
    this.header = new HttpHeaders();
    this.header.append("Content-Type", "application/json");
    this.header.set('Authorization', `Bearer ${this.auth.jwt}`);
    return this.http.get(url, {headers: this.header});
  }
}
