import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AllThemeDataProps } from '../../../../utils/theme-image';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  submitted = false;
  isLoading = false;
  form: FormGroup | any;
  currentImages: AllThemeDataProps | undefined;
  currentTheme = '';
  subscription: Subscription = new Subscription();
  
  constructor(
    private themeService: ThemeService,
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

}
