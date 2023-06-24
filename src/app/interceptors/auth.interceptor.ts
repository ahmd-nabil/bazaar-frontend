import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AccessToken } from '@okta/okta-auth-js';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: AccessToken;
  constructor(private oktaAuthStateServier: OktaAuthStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.oktaAuthStateServier.authState$.subscribe(authState => this.token =  authState.accessToken);
    if(this.token != undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.token.accessToken
        }
      })  
    }
    return next.handle(request);
  }
}
