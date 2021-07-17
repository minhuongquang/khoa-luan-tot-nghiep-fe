import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Tours } from 'src/app/core/models/main/tours.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ToursService } from 'src/app/core/services/main/tours.service';
import { customEmailValidator } from 'src/app/core/validators/email.validator';
import { phoneNumberValidator } from 'src/app/core/validators/phone.validator';

@Component({
  selector: 'app-form-tours',
  templateUrl: './form-tours.component.html',
  styleUrls: ['./form-tours.component.scss']
})
export class FormToursComponent implements OnInit {

  @Input() modalData: ModalData<Tours>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  fromDate: Date;
  toDate: Date;
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private toursSvc: ToursService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


  createForm(): void {
    this.form = this.fb.group({
      tenGV: ['', [Validators.required]],
      email: ['', [Validators.required, customEmailValidator]],
      sdt: ['', [Validators.required, phoneNumberValidator]],
      noiDungThamQuan: ['', [Validators.required]],
      khoa: ['', [Validators.required]],
      nganh: ['', [Validators.required]],
      soLuongSV: ['', [Validators.required]],
      sinhVienNamThu: ['', [Validators.required]],
      soLuongGvThamGia: ['', [Validators.required]],
      thoiGianDuKien: ['', [Validators.required]],
      tenCongTy: ['', [Validators.required]],
      diaChi: ['', [Validators.required]],
      sdtLienHeCongTy: ['', [Validators.required, phoneNumberValidator]],
      hocKi: ['', [Validators.required]],
      namHoc: ['', [Validators.required]],
      yeuCauCongVan: ['', [Validators.required]],
    });

    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenGV: this.modalData.data.tenGV,
        email: this.modalData.data.email,
        sdt: this.modalData.data.sdt,
        noiDungThamQuan: this.modalData.data.noiDungThamQuan,
        khoa: this.modalData.data.khoa,
        nganh:this.modalData.data.nganh,
        soLuongSV: this.modalData.data.soLuongSV,
        sinhVienNamThu: this.modalData.data.sinhVienNamThu,
        soLuongGvThamGia: this.modalData.data.soLuongGvThamGia,
        thoiGianDuKien: this.modalData.data.thoiGianDuKien,
        tenCongTy: this.modalData.data.tenCongTy,
        diaChi: this.modalData.data.diaChi,
        sdtLienHeCongTy: this.modalData.data.sdtLienHeCongTy,
        hocKi: this.modalData.data.hocKi,
        namHoc: this.modalData.data.namHoc,
        yeuCauCongVan: this.modalData.data.yeuCauCongVan,
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.toursSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.closeModal.emit(true);
            this.alert.success(this.langData[this.langCode].CAP_NHAT_THANH_CONG);
          }, () => this.spinner.hide());
      } else {
        this.spinner.show();
        this.toursSvc.create(this.form.value)
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
