import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpForATourContactedComponent } from './sign-up-for-a-tour-contacted/sign-up-for-a-tour-contacted.component';
import { signUpForATourContactedRoutes } from './sign-up-for-a-tour-contacted.routing';

@NgModule({
  declarations: [
    // Component here
    SignUpForATourContactedComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(signUpForATourContactedRoutes),
  ]
})
export class SignUpForATourContactedModule { }
