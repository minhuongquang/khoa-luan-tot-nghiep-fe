import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpForATourComponent } from './sign-up-for-a-tour/sign-up-for-a-tour.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { signUpForATourRoutes } from './sign-up-for-a-tour.routing';

@NgModule({
  declarations: [
    SignUpForATourComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(signUpForATourRoutes),
  ]
})
export class SignUpForATourModule { }
