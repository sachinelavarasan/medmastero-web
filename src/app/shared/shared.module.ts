import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomHttpInterceptor } from '../core/interceptors';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { InputComponent } from './input/input.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { LinkComponent } from './link/link.component';
import { CommonCheckBoxComponent } from './common-check-box/common-check-box.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonNormalComponent } from './button-normal/button-normal.component';
import { DarkSwitchComponent } from './dark-switch/dark-switch.component';
import { SideBarComponent } from './side-bar/app-side-bar.component';
import { CustomSelectBoxComponent } from './custom-select-box/custom-select-box.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgbModule],
  declarations: [
    InputComponent,
    CustomButtonComponent,
    LinkComponent,
    CommonCheckBoxComponent,
    NavbarComponent,
    ButtonNormalComponent,
    DarkSwitchComponent,
    SideBarComponent,
    CustomSelectBoxComponent,
    RadioButtonComponent,
    CustomTextareaComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    // HttpClientModule,
    InputComponent,
    CustomButtonComponent,
    LinkComponent,
    CommonCheckBoxComponent,
    NavbarComponent,
    ButtonNormalComponent,
    DarkSwitchComponent,
    SideBarComponent,
    CustomSelectBoxComponent,
    RadioButtonComponent,
    CustomTextareaComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi())
  ],
})
export class SharedModule {}
