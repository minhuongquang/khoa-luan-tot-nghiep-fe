import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutModule } from '../layouts/main/main-layout.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainLayoutModule,
    MainRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,

  ]
})
export class MainModule { }
