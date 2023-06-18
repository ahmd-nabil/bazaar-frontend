import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit{
  checkoutForm !: FormGroup ;
  subTotal: number = 0;
  shipping: number = 0;
  total: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }),
      creditCard: this.formBuilder.group({
        cardNumber: ['', Validators.required],
        cardExpiry: ['', Validators.required],
        cardCVC: ['', Validators.required]
      }),
      shippingAddress: this.formBuilder.group({
        country: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required]
      }),
      billingAddress: this.formBuilder.group({
        billingCountry: ['', Validators.required],
        billingStreet: ['', Validators.required],
        billingCity: ['', Validators.required],
        billingState: ['', Validators.required],
        billingZipcode: ['', Validators.required],
        sameAsShipping: false
      })
    });
  }

  onSameAsShippingChange(event: any) {
    let same: boolean = event.target.checked == null ? false : event.target.checked;
    if(same) {
      this.checkoutForm.get('billingAddress')?.get('billingCountry')?.setValue(this.checkoutForm.get('shippingAddress')?.get('country')?.getRawValue());
      this.checkoutForm.get('billingAddress')?.get('billingStreet')?.setValue(this.checkoutForm.get('shippingAddress')?.get('street')?.getRawValue());
      this.checkoutForm.get('billingAddress')?.get('billingCity')?.setValue(this.checkoutForm.get('shippingAddress')?.get('city')?.getRawValue());
      this.checkoutForm.get('billingAddress')?.get('billingState')?.setValue(this.checkoutForm.get('shippingAddress')?.get('state')?.getRawValue());
      this.checkoutForm.get('billingAddress')?.get('billingZipcode')?.setValue(this.checkoutForm.get('shippingAddress')?.get('zipcode')?.getRawValue());
    } else {
      this.checkoutForm.get('billingAddress')?.get('billingCountry')?.setValue('');
      this.checkoutForm.get('billingAddress')?.get('billingStreet')?.setValue('');
      this.checkoutForm.get('billingAddress')?.get('billingCity')?.setValue('');
      this.checkoutForm.get('billingAddress')?.get('billingState')?.setValue('');
      this.checkoutForm.get('billingAddress')?.get('billingZipcode')?.setValue('');
    }
  }

  onSubmit() {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
