import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule, RouterModule],
  exports: [RouterModule],
})
export class AuthModule {}
