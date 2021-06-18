import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  header: HttpHeaders;

  constructor(public http : HttpClient) { }

  getAllUsers()
  {
    let url = '/rest/user/all';
    this.header = new HttpHeaders();
    this.header.append("Content-Type", "application/json");
    return this.http.get(url, {headers: this.header});
  }
}
