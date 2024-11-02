import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';

import { ThemeService } from './core/services/theme.service';
import { LoginRouteActivator } from './core/services/protected-route-activator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AuthModule
  ],
  providers: [LoginRouteActivator, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
