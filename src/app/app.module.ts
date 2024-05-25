import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginRouteActivator } from './core/services/protected-route-activator.service';
import { HomeModule } from './home/home.module';
import { ThemeService } from './core/services/theme.service';
import { AuthModule } from './auth/auth.module';

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
