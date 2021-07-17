import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SubmitPostAfterTheTour } from 'src/app/core/models/submit-post-after-the-tour/submit-post-after-the-tour.model';
import { SubmitPostAfterTheTourService } from 'src/app/core/services/submit-post-after-the-tour/submit-post-after-the-tour.service';

@Component({
  selector: 'app-submit-post-after-the-tour',
  templateUrl: './submit-post-after-the-tour.component.html',
  styleUrls: ['./submit-post-after-the-tour.component.scss']
})
export class SubmitPostAfterTheTourComponent implements OnInit {
  @Input() modalData: ModalData<SubmitPostAfterTheTour>;
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
    private submitPostAfterTheTourSvc: SubmitPostAfterTheTourService,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.form = this.fb.group({
      maDoanThamQuan: ['', [Validators.required]],
      hoVaTen: ['', [Validators.required]],
      mssv: ['', [Validators.required]],
      baiThuHoach: ['', [Validators.required]],
      tenCongTy: ['', [Validators.required]],
      thoiGianPhuTrach: ['', [Validators.required]],
      giangVienPhuTrach: ['', [Validators.required]],
    });

    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        maDoanThamQuan: this.modalData.data.maDoanThamQuan,
        hoVaTen: this.modalData.data.hoVaTen,
        mssv: this.modalData.data.mssv,
        baiThuHoach: this.modalData.data.baiThuHoach,
        tenCongTy: this.modalData.data.tenCongTy,
        thoiGianPhuTrach: this.modalData.data.thoiGianPhuTrach,
        giangVienPhuTrach: this.modalData.data.giangVienPhuTrach,
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
        this.submitPostAfterTheTourSvc
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
        this.submitPostAfterTheTourSvc.create(this.form.value).subscribe(
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
