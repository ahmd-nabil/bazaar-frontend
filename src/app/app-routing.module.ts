import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'categories', component: CategoriesListComponent},
  {path:'products', component: ProductsComponent},
  {path:'products/:productId', component: ProductDetailsComponent},
  { path:"**", component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
