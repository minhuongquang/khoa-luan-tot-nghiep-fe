import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { FileService } from 'src/app/core/services/common/file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  breadcrumbObj: BreadCrumb = new BreadCrumb({
    heading: 'Tổng quan',
    listBreadcrumb: [{
      title: 'Danh Mục',
      link: UrlConstant.ROUTE.MANAGEMENT.CATEGORIES
    }]
  });

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  // End Upload file //////////////////////////////////////

  exampleForm: FormGroup;

  constructor(
    private fbd: FormBuilder,
    private fileSvc: FileService) {}

  ngOnInit(): void {
    this.exampleForm = this.fbd.group({
      fieldOneFile: ['608ee1bdcf819c3f45147e3f', [Validators.required]],
      fieldMultiFile: [['608ee1bdcf819c3f45147e3f', '608ee1bfcf819c3f45147e40'], [Validators.required]]
    });
  }

  viewFormValue() {
    console.log('FORM VALUE', this.exampleForm.value);
  }

}
