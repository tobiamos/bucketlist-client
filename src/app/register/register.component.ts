import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 registerForm: FormGroup;
 loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) {
    this.createForm();
   }

  ngOnInit() {
  }
  createForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20) ]],
      email: ['', [this.validateEmail, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    }, { validator: this.matchingPasswords('password', 'confirm')});
  }
  get name () { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirm() { return this.registerForm.get('confirm'); }

  onSubmit() {
    const data = this.registerForm.value;
    console.log(data);
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/bucketlist']);
    }, 3000);
  }
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { matchingPasswords: true };
      }
    };
  }
  validateEmail(input: FormControl) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //tslint:disable
      return regex.test(input.value) ? null : {
        validateEmail: {
          valid: false
        }
      };
  }

 
}
