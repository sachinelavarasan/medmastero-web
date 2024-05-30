import { Component, HostListener } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'medmastero-web';

  constructor(private themeService: ThemeService){
  }

  @HostListener('window:storage')
  onStorageChange() {
    if (!localStorage.getItem('user_email')) {
      window.location.reload();
    }
  }
  
}
