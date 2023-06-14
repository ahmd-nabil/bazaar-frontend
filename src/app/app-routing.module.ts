import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'categories', component: CategoriesListComponent},
  {path:'products', component: CategoryProductsComponent},
  { path:"**", component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
