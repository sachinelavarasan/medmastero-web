import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { ThemeService, Theme } from '../../core/services/theme.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  currentImages: AllThemeDataProps | undefined;
  currentTheme: string = '';
  subscription: Subscription = new Subscription();
  form: FormGroup | any;
  isLoading: boolean = false;
  otpVerificationStatus: boolean = false;
  gstVerificationStatus: boolean = false;

  constructor(
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
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
      email: new FormControl('', Validators.email),
      name: new FormControl('', Validators.email),
      otp: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.email),
      gstin: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
    });
  }

  toggleMode() {
    if (this.currentTheme === 'light') {
      this.themeService.setTheme(Theme.DARK);
    } else {
      this.themeService.setTheme(Theme.LIGHT);
    }
  }
  onSubmit(form: typeof this.form.value, isValid: boolean) {
    console.log(this.form);
  }
  onClick() {
    console.log(this.isLoading);
    this.isLoading = !this.isLoading;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
