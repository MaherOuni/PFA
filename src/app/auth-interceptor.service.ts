import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../app/authentication.service';
import { DemoService } from './demo/demo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private demo: DemoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = this.auth.jwt;
      // Demo mode issues no real token, and its requests only ever hit static
      // assets, so there is nothing worth attaching.
      if (this.demo.active || req.headers.get('skip')) {
        return next.handle(req);
      }

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
  }
}
