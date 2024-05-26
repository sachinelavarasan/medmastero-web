import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { ThemeService, Theme } from '../../core/services/theme.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  currentImages: AllThemeDataProps | undefined;
  currentTheme = '';
  subscription: Subscription = new Subscription();
  form: FormGroup | any;
  isLoading = false;

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
