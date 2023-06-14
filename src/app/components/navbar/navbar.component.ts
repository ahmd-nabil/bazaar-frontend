import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faGithub = faGithub;
  faLinkedIn = faLinkedin;
  faGoogle = faGoogle

  constructor(private router: Router) {}

  search(search : string) {
    this.router.navigate(['products'], {queryParams: {'search': search}});
  }
}
