import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toursRoutes } from './tours.routing';
import { FormToursComponent } from './form-tours/form-tours.component';
import { ListToursComponent } from './list-tours/list-tours.component';
@NgModule({
  declarations: [
    // Component here
    FormToursComponent,
    ListToursComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(toursRoutes),
  ]
})
export class ToursModule { }
