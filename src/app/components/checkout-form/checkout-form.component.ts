import { state } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/model/country';
import { OrderLine } from 'src/app/model/order-line';
import { State } from 'src/app/model/state';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit{
  checkoutForm !: FormGroup ;

  orderLines: OrderLine[] = [];
  subTotal: number = 0;
  shipping: number = 0;
  total: number = 0;

  countries: Country[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = []
  constructor(private formBuilder: FormBuilder,
              private shoppingCartService : ShoppingCartService,
              private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }),
      creditCard: this.formBuilder.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cardCVC: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
      }),
      shippingAddress: this.formBuilder.group({
        country: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      }),
      billingAddress: this.formBuilder.group({
        country: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        sameAsShipping: false
      })
    });

    this.shoppingCartService.cartItemsSubject.subscribe(cartItems => {
      this.orderLines = cartItems.map(item => new OrderLine(item));
    });
    this.shoppingCartService.totalPrice.subscribe(value => this.subTotal = value);
    this.checkoutService.getCountries().subscribe(countries => this.countries = countries);
  }

  onSameAsShippingChange(event: any) {
    let same: boolean = event.target.checked == null ? false : event.target.checked;
    if(same) {
      this.checkoutForm.get('billingAddress.country')?.setValue(this.checkoutForm.get('shippingAddress.country')?.getRawValue());
      this.checkoutForm.get('billingAddress.street')?.setValue(this.checkoutForm.get('shippingAddress.street')?.getRawValue());
      this.checkoutForm.get('billingAddress.city')?.setValue(this.checkoutForm.get('shippingAddress.city')?.getRawValue());
      this.checkoutForm.get('billingAddress.state')?.setValue(this.checkoutForm.get('shippingAddress.state')?.getRawValue());
      this.checkoutForm.get('billingAddress.zipcode')?.setValue(this.checkoutForm.get('shippingAddress.zipcode')?.getRawValue());
    } else {
      this.checkoutForm.get('billingAddress.country')?.setValue('');
      this.checkoutForm.get('billingAddress.street')?.setValue('');
      this.checkoutForm.get('billingAddress.city')?.setValue('');
      this.checkoutForm.get('billingAddress.state')?.setValue('');
      this.checkoutForm.get('billingAddress.zipcode')?.setValue('');
    }
  }

  onShippingCountryChange(event: any) {
    let idx = event.target.value;
    let country = this.countries[idx];
    this.checkoutService.getStates(country.id).subscribe(states=>this.shippingStates = states);
  }

  onBillingCountryChange(event: any) {
    let idx = event.target.value;
    let country = this.countries[idx];
    this.checkoutService.getStates(country.id).subscribe(states => this.billingStates = states);
  }

  onSubmit() {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
