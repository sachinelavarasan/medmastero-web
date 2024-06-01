import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ThemeService } from '../../core/services/theme.service';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  currentImages: AllThemeDataProps | undefined;
  subscription: Subscription = new Subscription();
  form!: FormGroup;
  isLoading = false;
  submitted = false;
  commonError = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.subscription.add(
      this.themeService.themeImages$.subscribe(res => {
        this.currentImages = res;
      })
    );

    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
    });
    this.subscription.add(
      this.form.valueChanges.subscribe(() => {
        this.submitted = false;
      })
    );
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
    this.isLoading = true;
    this.authService.login(data).subscribe({
      next: (res: any) => {
        this.authService.currentUser$.next(res.user);
        this.router.navigate(['/dashboard']);
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
  }

  getErrors(key: string) {
    return !!this.f[key].errors;
  }
  getErrorsMessage(key: string): string {
    const error = this.f[key].errors;
    let errorMessage = '';
    if (error !== null && this.submitted) {
      Object.keys(error).map((field: string) => {
        switch (field) {
          case 'email':
            errorMessage = errorMessage + `${new TitleCasePipe().transform(key)} is invalid`;
            return errorMessage;
          case 'required':
            errorMessage = errorMessage + `${new TitleCasePipe().transform(key)} is required`;
            return errorMessage;
          default:
            return errorMessage = error[field];
        }
      });
    }
    return errorMessage;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
