import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { RegistrationForLeadTheDelegation }
  from 'src/app/core/models/registration-for-lead-the-delegation/registration-for-lead-the-delegation.model';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { RegistrationForLeadTheDelegationService }
  from 'src/app/core/services/registration-for-lead-the-delegation/registration-for-lead-the-delegation.service';

@Component({
  selector: 'app-registration-for-lead-the-delegation',
  templateUrl: './registration-for-lead-the-delegation.component.html',
  styleUrls: ['./registration-for-lead-the-delegation.component.scss']
})
export class RegistrationForLeadTheDelegationComponent implements OnInit {
  @Input() modalData: ModalData<RegistrationForLeadTheDelegation>;
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
    private registrationForLeadTheDelegationSvc: RegistrationForLeadTheDelegationService,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.form = this.fb.group({
      thongTinDoan: ['', [Validators.required]],
      hoVaTen: ['', [Validators.required]],
      email: ['', [Validators.required]],
      sdt: ['', [Validators.required]]
    });
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.spinner.show();
        this.registrationForLeadTheDelegationSvc
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
        this.registrationForLeadTheDelegationSvc.create(this.form.value).subscribe(
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
