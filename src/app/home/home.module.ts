import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
