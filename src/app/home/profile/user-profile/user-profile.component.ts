import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import { AllThemeDataProps } from '../../../../utils/theme-image';
import { state } from '../../../../utils/state_data';
import { city } from '../../../../utils/city';

import { ThemeService } from '../../../core/services/theme.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

interface ILabelValue {
  label: string;
  value: string | number;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  submitted = false;
  isLoading = false;
  form!: FormGroup;
  currentImages: AllThemeDataProps | undefined;
  currentTheme = '';
  currentUser: any = null;
  subscription: Subscription = new Subscription();
  genderOptions: ILabelValue[] = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 },
    { label: 'Others', value: 3 },
    // { label: 'Non-binary', value: 4 },
    // { label: 'Prefer not to answer', value: 5 },
  ];
  stateOptions: ILabelValue[] = state;
  cityOptions: ILabelValue[] = [];
  commonError = '';

  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private authService: AuthService,
    // private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.themeService.themeImages$.subscribe(res => {
        this.currentImages = res;
      })
    );
    this.subscription.add(
      this.themeService.currentTheme$.subscribe(res => {
        this.currentTheme = res;
      })
    );
    this.subscription.add(
      this.authService.currentUser$.subscribe(res => {
        this.currentUser = res;
      })
    );
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.value;

    let data = { ...formValues };
    if (formValues.us_state) {
      data.us_state = formValues.us_state.value;
    }
    if (formValues.us_district) {
      data.us_district = formValues.us_district.value;
    }
    delete data.us_email;
    this.userService.updateUser(data).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.authService.currentUser$.next(res.updatedUser);
        this.createForm();
      },
      error: err => {
        if (err.error?.validationError) {
          for (const error of err.error.validationError) {
            this.f[error.field].setErrors({
              validation: error.message,
            });
          }
        } else if (err.error?.message) {
          this.commonError = err.error?.message;
        }
        this.isLoading = false;
      },
    });
    this.isLoading = true;
  }
  getErrors(key: string) {
    return !!this.f[key].errors;
  }
  getErrorsMessage(key: string, fieldName: string): string {
    const error = this.f[key].errors;
    let errorMessage = '';
    if (error !== null && this.submitted) {
      Object.keys(error).map((field: string) => {
        switch (field) {
          case 'email':
            errorMessage = `${new TitleCasePipe().transform(fieldName)} is invalid`;
            return errorMessage;
          case 'required':
            errorMessage = `${new TitleCasePipe().transform(fieldName)} is required`;
            return errorMessage;
          default:
            return errorMessage;
        }
      });
    }
    return errorMessage;
  }

  onStateChange(value: string) {
    this.cityOptions = city[value];
  }

  onCancel() {
    this.createForm();
  }

  createForm() {
    this.onStateChange(this.currentUser?.us_state);
    this.form = this.fb.group({
      us_email: new FormControl({ value: this.currentUser?.us_email || '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      us_fullname: new FormControl(this.currentUser?.us_fullname || '', Validators.required),
      us_phone_number: this.currentUser?.us_phone_number || '',
      us_address: new FormControl(this.currentUser?.us_address || '', Validators.required),
      us_username: new FormControl(this.currentUser?.us_username || '', Validators.required),
      us_state: new FormControl(this.currentUser?.us_state || null),
      us_pincode: this.currentUser?.us_pincode || '',
      us_district: new FormControl(this.currentUser?.us_district || null),
      us_gender: new FormControl(this.currentUser?.us_gender || null, Validators.required),
    });
  }
}
