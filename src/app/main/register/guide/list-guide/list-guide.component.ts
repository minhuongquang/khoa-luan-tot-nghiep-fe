import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Tours } from 'src/app/core/models/main/tours.model';
import { ToursService } from 'src/app/core/services/main/tours.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-guide',
  templateUrl: './list-guide.component.html',
  styleUrls: ['./list-guide.component.scss']
})
export class ListGuideComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  modalData: ModalData<Tours> = new ModalData<Tours>();
  listTours: Paginate<Tours> = new Paginate<Tours>();

  searchValue = '';
  tuNgay: Date = new Date();
  deNgay: Date = new Date();
  lstours = [
    { id: 1, tenCongTy: 'cty 01', tuNgay: '7:30 12/01/2021', denNgay: '17:00 12/01/2021', trangThai: true },
    { id: 2, tenCongTy: 'cty 02', tuNgay: '7:30 13/01/2021', denNgay: '17:00 13/01/2021', trangThai: false },
    { id: 3, tenCongTy: 'cty 03', tuNgay: '7:30 14/01/2021', denNgay: '17:00 14/01/2021', trangThai: true }
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private toursSvc: ToursService
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  fillterTours() {
    return this.lstours.filter((x) => x.trangThai);
  }

  getDataPaging(): void {
    this.spinner.show();
    this.toursSvc
      .getAllPaging(
        this.listTours.currentPage - 1,
        this.listTours.limit,
        this.searchValue
      )
      .subscribe(
        (res) => {
          this.listTours.currentPage = res.pageable.pageNumber + 1;
          this.listTours.limit = res.pageable.pageSize;
          this.listTours.totalPage = res.totalPages;
          this.listTours.totalItem = res.totalElements;
          this.listTours.data = res.content;
          this.spinner.hide();
        }, () => this.spinner.hide()
      );
  }

  openModal(template: TemplateRef<unknown>, data?: Tours): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: this.langData[this.langCode].DANG_KY,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<Tours>): void {
    this.listTours = page;
    this.getDataPaging();
  }

  changeStatus(id: string): void {
    this.nzModalSvc.confirm({
      nzWidth: 300,
      nzTitle: this.langData[this.langCode].XAC_NHAN_THAY_DOI_TRANG_THAI,
      nzCancelText: this.langData[this.langCode].HUY,
      nzOkDanger: true,
      nzOkText: this.langData[this.langCode].XAC_NHAN,
      nzOnOk: () => {
        this.spinner.show();
        this.toursSvc.delete(id).subscribe(
          () => {
            this.spinner.hide();
            this.alert.success(
              this.langData[this.langCode].THAY_DOI_THANH_CONG
            );
            this.getDataPaging();
          }, () => this.spinner.hide());
      },
    });
  }

}
