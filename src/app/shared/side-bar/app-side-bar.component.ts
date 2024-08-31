import {
  Component,
  inject,
  TemplateRef,
  ViewEncapsulation,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';

import { AllThemeDataProps } from '../../../utils/theme-image';

import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './app-side-bar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas);
  @Input() currentTheme: string | undefined;
  @Input() currentImages: AllThemeDataProps | undefined;
  @Output() switchTheme = new EventEmitter();
  @Output() logout = new EventEmitter();

  currentUser: any = null;
  subscription: Subscription = new Subscription();
  private offcanvasRef: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription.add(
      this.authService.currentUser$.subscribe((res) => {
        this.currentUser = res;
      })
    );
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasRef = this.offcanvasService.open(content, { position: 'start' });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 767 && this.offcanvasRef) { // Adjust the width value as needed
      this.offcanvasRef.dismiss();
    }
  }
}

