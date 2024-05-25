import { Component, Inject } from '@angular/core';
import { Theme, ThemeService } from '../../core/services/theme.service';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  currentImages: AllThemeDataProps | undefined;
  currentTheme: string = '';
  subscription: Subscription = new Subscription();
  form: FormGroup|any;

  constructor(
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder
  ) {
   
  }
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
console.log(this.form)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
