import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AllThemeDataProps } from '../../../utils/theme-image';

import { ThemeService, Theme } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  currentTheme!: string;
  currentImages: AllThemeDataProps | undefined;
  currentUser: any = null;
  subscription: Subscription = new Subscription();

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.themeService.themeImages$.subscribe(res => {
      this.currentImages = res;
    });

    this.themeService.currentTheme$.subscribe(res => {
      this.currentTheme = res;
    });

    this.subscription.add(
      this.authService.currentUser$.subscribe(res => {
        this.currentUser = res;
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

  // logout
  logout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        this.authService.currentUser$.next(null);
        localStorage.removeItem('user_email');
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
