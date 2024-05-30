import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomHttpInterceptor } from '../core/interceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputComponent } from './input/input.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { LinkComponent } from './link/link.component';
import { CommonCheckBoxComponent } from './common-check-box/common-check-box.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonNormalComponent } from './button-normal/button-normal.component';
import { DarkSwitchComponent } from './dark-switch/dark-switch.component';

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
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputComponent,
    CustomButtonComponent,
    LinkComponent,
    CommonCheckBoxComponent,
    NavbarComponent,
    ButtonNormalComponent,
    DarkSwitchComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
