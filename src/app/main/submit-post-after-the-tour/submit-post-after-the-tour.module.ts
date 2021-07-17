import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitPostAfterTheTourComponent } from './submit-post-after-the-tour/submit-post-after-the-tour.component';
import { submitPostAfterTheTourRoutes } from './submit-post-after-the-tour.routing';

@NgModule({
  declarations: [
    SubmitPostAfterTheTourComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(submitPostAfterTheTourRoutes),
  ]
})
export class SubmitPostAfterTheTourModule { }
