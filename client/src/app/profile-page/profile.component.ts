import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserProjection, UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdateDialogComponent} from "./update-dialog/update-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent{

  formControl: FormGroup; // Validation control

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService,
    private router: Router, fb: FormBuilder, private dialog: MatDialog) {
    this.buildFormValidation(fb);
    userService.fetch(tokenStorageService.getUser().id).subscribe(value => {
      this.formControl.setValue({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        phone: value.phone,
        rating: value.rating
      });
    });
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

  get phone() {
    return this.formControl.get('phone');
  }

  get rating() {
    return this.formControl.get('rating');
  }

  update() {
    const user: UserProjection = this.formControl.value;
    user.id = this.tokenStorageService.getUser().id;
    this.userService.update(user).subscribe(
      data => {
        let dialogRef = this.dialog.open(UpdateDialogComponent, {
        });
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
      phone: fb.control('', [Validators.required, Validators.maxLength(32)]),
      rating: fb.control('', [Validators.required, Validators.maxLength(2)])
    });
  }
}
