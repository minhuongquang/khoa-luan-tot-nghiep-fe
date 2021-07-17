import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { guideRoutes } from './guide.routing';
import { ListGuideComponent } from './list-guide/list-guide.component';
import { FormGuideComponent } from './form-guide/form-guide.component';
@NgModule({
  declarations: [
    // Component here
    ListGuideComponent,
    FormGuideComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(guideRoutes),
  ]
})
export class GuideModule { }
