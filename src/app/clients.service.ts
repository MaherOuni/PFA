import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  header: HttpHeaders;
  constructor(public http : HttpClient) { }

  getAllClients()
  {
    let url = `${environment.apiUrl}/rest/client/all`;
    this.header = new HttpHeaders();
    this.header.append("Content-Type", "application/json");
    return this.http.get(url, {headers: this.header});
  }
}
