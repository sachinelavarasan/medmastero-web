import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  darkThemeData,
  lightThemeData,
  commonIcon,
  AllThemeDataProps,
} from '../../../utils/theme-image';
import { DOCUMENT } from '@angular/common';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  lightTheme: AllThemeDataProps = {...lightThemeData,...commonIcon};
  darkTheme: AllThemeDataProps = {...darkThemeData,...commonIcon};

  themeImages$ = new BehaviorSubject<AllThemeDataProps>(this.darkTheme);

  currentTheme$ = new BehaviorSubject<Theme>(
    localStorage.getItem('theme') === 'dark' ? Theme.DARK : Theme.LIGHT
  );


  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setTheme(this.currentTheme$.value);
  }

  setTheme(currentTheme: Theme) {
    if (currentTheme === Theme.DARK) {
      localStorage.setItem('theme', Theme.DARK);
      this.document.body.classList.toggle('dark');
      this.themeImages$.next(this.darkTheme);
      this.currentTheme$.next(Theme.DARK);
    } else {
      localStorage.setItem('theme', Theme.LIGHT);
      this.document.body.classList.remove('dark');
      this.themeImages$.next(this.lightTheme)
      this.currentTheme$.next(Theme.LIGHT);
    }
  }
}
