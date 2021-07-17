import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ToursService } from 'src/app/core/services/main/tours.service';
import { customEmailValidator } from 'src/app/core/validators/email.validator';
import { phoneNumberValidator } from 'src/app/core/validators/phone.validator';
import { DangKyDanDoan } from 'src/app/core/models/main/guide.model';


@Component({
  selector: 'app-form-guide',
  templateUrl: './form-guide.component.html',
  styleUrls: ['./form-guide.component.scss']
})
export class FormGuideComponent implements OnInit {

  @Input() modalData: ModalData<DangKyDanDoan>;
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
    private toursSvc: ToursService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      tenGV: ['', [Validators.required]],
      email: ['', [Validators.required, customEmailValidator]],
      sdt: ['', [Validators.required, phoneNumberValidator]],
    });

    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        hoVaTen: this.modalData.data.hoVaTen,
        email: this.modalData.data.email,
        sdt: this.modalData.data.sdt,
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
