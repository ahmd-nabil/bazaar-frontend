import { Injectable, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Country } from '../model/country';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit{

  readonly ORDERS_API = "http://localhost:8080/api/v1/orders";
  readonly COUNTRIES_API = "http://localhost:8080/api/v1/countries";
  readonly STATES_API = "http://localhost:8080/api/v1/states";

  constructor(private shoppingCartService: ShoppingCartService,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.COUNTRIES_API);
  }

  getStates(countryId: number): Observable<State[]> {
    return this.http.get<State[]>(this.STATES_API+"/"+countryId);
  }
  
  savedOrder() {
  }
}
