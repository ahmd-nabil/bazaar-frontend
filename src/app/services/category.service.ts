import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Page } from '../model/page';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    
    readonly CATEGORIES_API = "http://localhost:8080/api/v1/categories";
    constructor(
        private http: HttpClient 
    ) {}

    getAllCategories(): Observable<Page<Category>> {
        return this.http.get<Page<Category>>(this.CATEGORIES_API);
    }
}