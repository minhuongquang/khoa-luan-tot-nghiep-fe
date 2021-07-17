import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { SignUpForATourContacted }
  from 'src/app/core/models/sign-up-for-a-tour-contacted/sign-up-for-a-tour-contacted.model';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SignUpForATourContactedService } from 'src/app/core/services/sign-up-for-a-tour-contacted/sign-up-for-a-tour-contacted.service';

@Component({
  selector: 'app-sign-up-for-a-tour-contacted',
  templateUrl: './sign-up-for-a-tour-contacted.component.html',
  styleUrls: ['./sign-up-for-a-tour-contacted.component.scss']
})
export class SignUpForATourContactedComponent implements OnInit {
  @Input() modalData: ModalData<SignUpForATourContacted>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  constructor(
    private fb: FormBuilder,
    private formValidatorSvc: FormValidatorService,
    private spinner: NgxSpinnerService,
    private signUpForATourContactedSvc: SignUpForATourContactedService,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      tenGV: ['', [Validators.required]],
      tenKhoa: ['', [Validators.required]],
      soLuongSV: ['', [Validators.required]],
      sinhVienNam: ['', [Validators.required]],
      thoiGianDuKien: ['', [Validators.required]],
      tenCongTy: ['', [Validators.required]],
      diaChi: ['', [Validators.required]],
      hocKi: ['', [Validators.required]],
      namHoc: ['', [Validators.required]],
      noiDungThamQuan: ['', [Validators.required]],
      nganh: ['', [Validators.required]],
      yeuCauCongVan: ['', [Validators.required]]
    });

    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenGV: this.modalData.data.tenGV,
        khoa: this.modalData.data.tenKhoa,
        soLuongSV: this.modalData.data.soLuongSV,
        sinhVienNam: this.modalData.data.sinhVienNam,
        thoiGianDuKien: this.modalData.data.thoiGianDuKien,
        tenCongTy: this.modalData.data.tenCongTy,
        diaChi: this.modalData.data.diaChi,
        hocKi: this.modalData.data.hocKi,
        namHoc: this.modalData.data.namHoc,
        noiDungThamQuan: this.modalData.data.noiDungThamQuan,
        nghanh: this.modalData.data.nganh,
        yeuCauCongVan: this.modalData.data.yeuCauCongVan
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
        this.signUpForATourContactedSvc
          .update(this.form.value, this.modalData.data.id)
          .subscribe(
            () => {
              this.closeModal.emit(true);
              this.alert.success(
                this.langData[this.langCode].CAP_NHAT_THANH_CONG
              );
            },
            () => this.spinner.hide()
          );
      } else {
        this.spinner.show();
        this.signUpForATourContactedSvc.create(this.form.value).subscribe(
          () => {
            this.closeModal.emit(true);
            this.alert.success(
              this.langData[this.langCode].THEM_MOI_THANH_CONG
            );
          },
          () => this.spinner.hide()
        );
      }
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

}
