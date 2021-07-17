import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationForLeadTheDelegationComponent }
  from './registration-for-lead-the-delegation/registration-for-lead-the-delegation.component';
import { registrationForLeadTheDelegationRoutes } from './registration-for-lead-the-delegation.routing';

@NgModule({
  declarations: [
    RegistrationForLeadTheDelegationComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(registrationForLeadTheDelegationRoutes),
  ]
})
export class RegistrationForLeadTheDelegationModule { }
