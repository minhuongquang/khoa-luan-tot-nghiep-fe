import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { guideRoutes } from './guide.routing';
import { ListCheckinGuideComponent } from './list-checkin-guide/list-checkin-guide.component';
import { FormCheckinGuideComponent } from './form-checkin-guide/form-checkin-guide.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';

@NgModule({
  declarations: [
    // Component here
    ListCheckinGuideComponent,
    FormCheckinGuideComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BarcodeScannerLivestreamModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(guideRoutes),
  ]
})
export class GuideModule { }
