import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input()
  pageNumber !: number;

  @Input()
  totalPages !: number;

  constructor(private router: Router){}

  pageChanged(pageNumber: number) {
    console.log(pageNumber);
    this.router.navigate([], {
      queryParams: {'pageNumber': pageNumber},
      queryParamsHandling: 'merge'
    })
  }
}
