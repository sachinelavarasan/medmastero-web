import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomHttpInterceptor } from '../core/interceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule,FormsModule],
  declarations: [],
  exports: [CommonModule, FormsModule,HttpClientModule],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true,
  },]
})
export class SharedModule {}
