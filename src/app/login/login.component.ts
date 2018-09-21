import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
 loading = false;
 previousUrl;
 public toastConfig = {
  closeButton: true,
  progressBar: true,
};

 errorMessage;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private authGuard: AuthGuard,
    private toastr: ToastrService,
    ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.toastr.error(
        'You must be logged in to view that page',
        '',
        this.toastConfig
      );
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
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
    this.auth.login(data).subscribe(
      response => {
        this.loading = false,
        console.log(response);
        const token = response['data']['token'];
        this.auth.storeUserData(token);
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl]);
        } else {
          this.router.navigate(['/bucketlist']);
        }

      },
       error => {
         this.loading = false;
         this.errorMessage = error.error['message'] || 'Login Error';
       }
       );
  }
}
