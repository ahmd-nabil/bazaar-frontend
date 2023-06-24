import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchQ: string = '';

  constructor(private router: Router) {}

  search() {
    this.router.navigate(['products'], {queryParams: {'search': this.searchQ}});
  }
}
