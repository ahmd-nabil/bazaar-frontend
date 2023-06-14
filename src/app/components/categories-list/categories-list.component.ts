import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit{
  categories: Category[] = []

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(page => {
      this.categories = page.content; 
      console.log(page)
    });
  }
}
