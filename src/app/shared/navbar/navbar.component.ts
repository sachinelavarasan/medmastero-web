import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { AllThemeDataProps } from '../../../utils/theme-image';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  currentTheme!: string;
  currentImages: AllThemeDataProps | undefined;

  constructor(
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.themeService.themeImages$.subscribe(res => {
      this.currentImages = res;
    });

    this.themeService.currentTheme$.subscribe(res => {
      this.currentTheme = res;
    });
  }

  toggleMode() {
    if (this.currentTheme === 'light') {
      this.themeService.setTheme(Theme.DARK);
    } else {
      this.themeService.setTheme(Theme.LIGHT);
    }
  }
}
