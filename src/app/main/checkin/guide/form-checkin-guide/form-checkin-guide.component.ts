import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { ToursService } from 'src/app/core/services/main/tours.service';
import { CongTacVien } from 'src/app/core/models/main/cong-tac-vien.model';
import { BarcodeResult } from 'src/app/core/models/common/barcode-result.model';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-form-checkin-guide',
  templateUrl: './form-checkin-guide.component.html',
  styleUrls: ['./form-checkin-guide.component.scss']
})
export class FormCheckinGuideComponent implements OnInit {

  @Input() modalData: ModalData<CongTacVien>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;
  title = 'bar-code';
  showScanner = true;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue = '';
  lat = 0;
  long = 0;


  constructor(
    private fb: FormBuilder,
    private toursSvc: ToursService,
    private formValidatorSvc: FormValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: BarcodeResult) {
    this.barcodeValue = result.codeResult.code;
    this.showScanner = false;
    window.alert(result.codeResult.code);
  }

  onStarted(started: boolean) {
    console.log('onStarted', started);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        // this.callApi(longitude, latitude);
        this.lat = latitude;
        this.long = longitude;
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  callApi(Longitude: number, Latitude: number) {
    // eslint-disable-next-line no-unused-vars
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`;
    //Call API
  }

  ngOnInit(): void {
  }

  createForm(): void {
  }

  onSubmit(): void {
  }

  capturedQr(result: string) {
    console.log(result);
  }

}
