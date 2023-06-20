import { state } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/model/address';
import { Country } from 'src/app/model/country';
import { Order } from 'src/app/model/order';
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
      this.onBillingCountryChange();
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
    console.log(this.checkoutForm.get('billingAddress.state')?.value)
  }

  onShippingCountryChange() {
    let idx = this.checkoutForm.get('shippingAddress.country')?.value;
    let country = this.countries[idx];
    if(country != null && country != undefined) {
      this.checkoutService.getStates(country.id).subscribe(states=>this.shippingStates = states);
    }
  }

  onBillingCountryChange() {
    let idx = this.checkoutForm.get('billingAddress.country')?.value;
    let country = this.countries[idx];
    if(country != null && country != undefined) {
      this.checkoutService.getStates(country.id).subscribe(states => this.billingStates = states);
    }
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.checkoutForm.value);

    let shippingCountry = this.countries[+this.checkoutForm.get('shippingAddress.country').value];
    let shippingState = this.shippingStates[+this.checkoutForm.get('shippingAddress.state').value];
    let shippingAddress = new Address(null, shippingCountry, shippingState, this.checkoutForm.get('shippingAddress.street').value, this.checkoutForm.get('shippingAddress.city').value, this.checkoutForm.get('shippingAddress.zipcode').value);
    
    let billingCountry = this.countries[+this.checkoutForm.get('billingAddress.country').value];
    let billingState = this.billingStates[+this.checkoutForm.get('billingAddress.state').value];
    let billingAddress = new Address(null, billingCountry, billingState, this.checkoutForm.get('billingAddress.street').value, this.checkoutForm.get('billingAddress.city').value, this.checkoutForm.get('billingAddress.zipcode').value);
    
    
    
    let order = new Order(this.checkoutForm.get('customer.firstName').value, this.checkoutForm.get('customer.lastName').value, this.checkoutForm.get('customer.email').value,
                this.checkoutForm.get('creditCard.cardNumber').value, this.checkoutForm.get('creditCard.cardExpiry').value, this.checkoutForm.get('creditCard.cardCVC').value,
                shippingAddress, billingAddress, this.orderLines);
    console.log(order);
      this.checkoutService.savedOrder(order).subscribe(result => console.log(result));
      this.checkoutForm.reset();
  }
}
