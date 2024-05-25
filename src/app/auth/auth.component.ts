import { Component } from '@angular/core';
import { AllThemeDataProps } from '../../utils/theme-image';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  currentImages: AllThemeDataProps | undefined;
  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService.themeImages$.subscribe(res => {
      this.currentImages = res;
    });
  }
}
