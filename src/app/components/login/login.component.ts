import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import oktaConfig from 'src/app/config/okta-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn({
      logo: '/assets/images/logo_transparent.png',
      baseUrl: oktaConfig.oidc.issuer.split('/oauth2')[0],
      clientId: oktaConfig.oidc.clientId,
      redirectUri: oktaConfig.oidc.redirectUri,
      useInteractionCodeFlow: oktaConfig.oidc.useInteractionCodeFlow,
      useClassicEngine: oktaConfig.oidc.useClassicEngine,
      authParams: {
        pkce: true,
        issuer: oktaConfig.oidc.issuer,
        scopes: oktaConfig.oidc.scopes
      },
      features: {
        registration: true
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl({
      el: '#okta-signin-widget'
    }, (response: any) => {
      if(response.status == 'SUCCESS') {
        this.oktaAuth.signInWithRedirect();
      }
    },
    (error: any) => {
      throw error
    }
    )
  }
}
