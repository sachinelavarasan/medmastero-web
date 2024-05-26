import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomHttpInterceptor } from '../core/interceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputComponent } from './input/input.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { LinkComponent } from './link/link.component';
import { CommonCheckBoxComponent } from './common-check-box/common-check-box.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  declarations: [InputComponent, CustomButtonComponent, LinkComponent,CommonCheckBoxComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputComponent,
    CustomButtonComponent,
    LinkComponent,
    CommonCheckBoxComponent
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
