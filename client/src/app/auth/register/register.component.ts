import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from './password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  formControl: FormGroup; // Validation control

  constructor(private authService: AuthService,
    private router: Router, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  ngOnInit() {
  }

  get firstName() {
    return this.formControl.get('firstName');
  }

  get lastName() {
    return this.formControl.get('lastName');
  }

  get email() {
    return this.formControl.get('email');
  }

  get password() {
    return this.formControl.get('password');
  }

  get confirmPassword() {
    return this.formControl.get('confirmPassword');
  }

  get phone() {
    return this.formControl.get('phone');
  }

  get rating() {
    return this.formControl.get('rating');
  }

  register() {
    this.authService.register(this.formControl.value).subscribe(
      data => {
        this.router.navigate(['login']);
      },
      err => {
        console.log(err);
        switch (err.status) {
          case 401:
            this.formControl.setErrors({
              emailExists: true
            });
            break;
          default:
            this.formControl.setErrors({
              internalError: true
            });
            break;
        }
      }
    );
  }

  private buildFormValidation(fb: FormBuilder) {
    this.formControl = fb.group({
      firstName: fb.control('', [Validators.required, Validators.maxLength(50)]),
      lastName: fb.control('', [Validators.required, Validators.maxLength(50)]),
      email: fb.control('', [Validators.required, Validators.maxLength(50)]),
      password: fb.control('', [Validators.required]),
      confirmPassword: fb.control('', [Validators.required]),
      phone: fb.control('', [Validators.required, Validators.maxLength(32)]),
      rating: fb.control('', [Validators.required, Validators.maxLength(2)])
    },
      {
        validator: PasswordValidation.MatchPassword
      });
  }
}
