import { Component, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth, { UserClaims } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent {
  isAuthenticated = false;
  userClaims: UserClaims;
  
  constructor(
    private oktaAuthStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
    ) 
    {
    this.oktaAuthStateService.authState$.subscribe(
      authState => {
        this.isAuthenticated = authState.isAuthenticated;
        if(this.isAuthenticated) {
          this.oktaAuth.getUser().then(result => this.userClaims = result);
        }
      }
    );
  }

  logout() {
    this.oktaAuth.signOut();
  }


}
