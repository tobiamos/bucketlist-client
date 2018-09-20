import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
 loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router
    ) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.loading = true;
    const data = this.loginForm.value;
    console.log(data);
    setTimeout(() => {
      this.router.navigate(['/bucketlist']);
    }, 3000);
  }

}
