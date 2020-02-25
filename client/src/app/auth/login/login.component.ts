import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  formControl: FormGroup; // Validation control

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  ngOnInit() {
  }

  get email() {
    return this.formControl.get('email');
  }

  get password() {
    return this.formControl.get('password');
  }

  login() {
    this.authService.login(this.formControl.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.jwt);
        this.tokenStorage.saveUser(data.userDetails);

        let redirectUrl = this.authService.redirectUrl || '';
        this.authService.redirectUrl = null;
        this.router.navigate([redirectUrl]);
      },
      err => {
        switch (err.status) {
          case 400:
            this.formControl.setErrors({
              invalidCredentials: true
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

  navigateToRegistrationPage() {
    this.router.navigate(['register']);
  }

  private buildFormValidation(fb: FormBuilder) {
    this.formControl = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required])
    });
  }
}
