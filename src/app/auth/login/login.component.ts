import { Component, Inject } from '@angular/core';
import { Theme, ThemeService } from '../../core/services/theme.service';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  currentImages: AllThemeDataProps | undefined;
  currentTheme: string = '';
  subscription: Subscription = new Subscription();
  form: FormGroup;
  
  constructor(private themeService: ThemeService, @Inject(DOCUMENT) private document: Document,private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
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
  }

  toggleMode() {
    if (this.currentTheme === 'light') {
      this.themeService.setTheme(Theme.DARK);
    } else {
      this.themeService.setTheme(Theme.LIGHT);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
