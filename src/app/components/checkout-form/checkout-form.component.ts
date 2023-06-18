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
        billingCountry: ['', Validators.required],
        billingStreet: ['', Validators.required],
        billingCity: ['', Validators.required],
        billingState: ['', Validators.required],
        billingZipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        sameAsShipping: false
      })
    });
  }

  onSameAsShippingChange(event: any) {
    let same: boolean = event.target.checked == null ? false : event.target.checked;
    if(same) {
      this.checkoutForm.get('billingAddress.billingCountry')?.setValue(this.checkoutForm.get('shippingAddress.country')?.getRawValue());
      this.checkoutForm.get('billingAddress.billingStreet')?.setValue(this.checkoutForm.get('shippingAddress.street')?.getRawValue());
      this.checkoutForm.get('billingAddress.billingCity')?.setValue(this.checkoutForm.get('shippingAddress.city')?.getRawValue());
      this.checkoutForm.get('billingAddress.billingState')?.setValue(this.checkoutForm.get('shippingAddress.state')?.getRawValue());
      this.checkoutForm.get('billingAddress.billingZipcode')?.setValue(this.checkoutForm.get('shippingAddress.zipcode')?.getRawValue());
    } else {
      this.checkoutForm.get('billingAddress.billingCountry')?.setValue('');
      this.checkoutForm.get('billingAddress.billingStreet')?.setValue('');
      this.checkoutForm.get('billingAddress.billingCity')?.setValue('');
      this.checkoutForm.get('billingAddress.billingState')?.setValue('');
      this.checkoutForm.get('billingAddress.billingZipcode')?.setValue('');
    }
  }

  onSubmit() {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
