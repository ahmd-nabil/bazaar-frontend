import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'categories', component: CategoriesListComponent },
  { path:'products', component: ProductsComponent },
  { path:'products/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartDetailsComponent},
  { path: 'checkout', component: CheckoutFormComponent},
  { path:"**", component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
