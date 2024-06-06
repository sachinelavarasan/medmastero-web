import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  currentImages: AllThemeDataProps | undefined;
  currentTheme = '';
  subscription: Subscription = new Subscription();
  form: FormGroup | any;
  isLoading = false;
  otpVerificationStatus = false;
  gstVerificationStatus = false;
  submitted = false;
  commonError = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
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

    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl('', Validators.required),
      // otp: new FormControl('', Validators.required),
      // phone: new FormControl('', Validators.required),
      // gstin: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    this.authService.signup(data).subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (err) => {
        if(err.error?.validationError){
          for (const error of err.error.validationError) { 
            this.f[error.field].setErrors({
              validation: error.message
            })
          }
        }
        else if(err.error?.message){
          this.commonError= err.error?.message
        }
        this.isLoading = false;
      },
    });
    this.isLoading = true;
  }

  getErrors(key: string) {
    return !!this.f[key].errors;
  }
  getErrorsMessage(key: string):string {
    const error = this.f[key].errors;
    let errorMessage = '';
    if (error !== null && this.submitted) {
      Object.keys(error).map((field: string) => {
        switch (field) {
          case 'email':
            errorMessage = `${new TitleCasePipe().transform(key)} is invalid`;
           return errorMessage;
          case 'required':
            errorMessage = `${new TitleCasePipe().transform(key)} is required`;
            return errorMessage;
            default:
              return errorMessage;
        }
      });
    }
    return errorMessage;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
