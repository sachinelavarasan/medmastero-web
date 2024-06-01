import { Component, inject, TemplateRef, ViewEncapsulation, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  
    constructor(
    ) {}
  

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'start' });
	}

	openTop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'top' });
	}

	openBottom(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'bottom' });
	}

	openNoBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdrop: false });
	}

	openStaticBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdrop: 'static' });
	}

	openScroll(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { scroll: true });
	}

	openNoKeyboard(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { keyboard: false });
	}

	openNoAnimation(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { animation: false });
	}

	openCustomBackdropClass(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdropClass: 'bg-info' });
	}

	openCustomPanelClass(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { panelClass: 'bg-info' });
	}
}
