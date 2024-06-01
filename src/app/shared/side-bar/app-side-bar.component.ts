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
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AllThemeDataProps } from '../../../utils/theme-image';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './app-side-bar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent {
  private offcanvasService = inject(NgbOffcanvas);
  @Input() currentTheme: string | undefined;
  @Input() currentImages: AllThemeDataProps | undefined;
  @Output() switchTheme = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() {}

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'start' });
  }
}
