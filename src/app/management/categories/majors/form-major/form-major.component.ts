import { Khoa } from './../../../../core/models/categories/khoa.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Nganh } from 'src/app/core/models/categories/nganh.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { KhoaService } from 'src/app/core/services/management/categories/khoa.service';
import { NganhService } from 'src/app/core/services/management/categories/nganh.service';


@Component({
  selector: 'app-form-major',
  templateUrl: './form-major.component.html',
  styleUrls: ['./form-major.component.scss']
})
export class FormMajorComponent implements OnInit {
  @Input() modalData: ModalData<Nganh>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  listKhoa: Khoa[];
  constructor(
    private fb: FormBuilder,
    private nganhSvc: NganhService,
    private khoaSvc: KhoaService,

    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }


  createForm(): void {
    this.form = this.fb.group({
      thuTu: ['', [Validators.required]],
      maNganh: ['', [Validators.required]],
      tenNganh: ['', [Validators.required]],
      tenNganhEn: [''],
      khoa: ['', [Validators.required]]
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        thuTu: this.modalData.data.thuTu,
        maNganh: this.modalData.data.maNganh,
        tenNganh: this.modalData.data.tenNganh,
        tenNganhEn: this.modalData.data.tenNganhEn,
        khoa: this.modalData.data.khoa.tenKhoa
      });
    }
    this.getListKhoa();
  }

  getListKhoa(): void {
    this.khoaSvc.getAll()
      .subscribe(res => {
        this.listKhoa = res;
      });
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.form.get('maNganh').setValue(this.form.get('maNganh').value.toUpperCase());
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.nganhSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        console.log(this.form.value);
        this.nganhSvc.create(this.form.value)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].THEM_MOI_THANH_CONG);
          }, () => this.spinner.hide());
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }
}
