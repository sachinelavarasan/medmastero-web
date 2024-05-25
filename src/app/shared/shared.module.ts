import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomHttpInterceptor } from '../core/interceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputComponent],
  exports: [CommonModule, FormsModule, HttpClientModule, InputComponent,    FormsModule,
    ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
