import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Theme, ThemeService } from '../../core/services/theme.service';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { DOCUMENT, TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  currentImages: AllThemeDataProps | undefined;
  currentTheme = '';
  subscription: Subscription = new Subscription();
  form!: FormGroup;
  isLoading = false;
  submitted = false;

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

  toggleMode() {
    if (this.currentTheme === 'light') {
      this.themeService.setTheme(Theme.DARK);
    } else {
      this.themeService.setTheme(Theme.LIGHT);
    }
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
            errorMessage = errorMessage + `${new TitleCasePipe().transform(key)} is invalid`;
           return errorMessage;
          case 'required':
            errorMessage = errorMessage + `${new TitleCasePipe().transform(key)} is required`;
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
