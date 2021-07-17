import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { CongTacVien } from 'src/app/core/models/main/cong-tac-vien.model';
import { DiemDanhCongTacVienService } from 'src/app/core/services/main/diem-danh-cong-tac-vien.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-checkin-guide',
  templateUrl: './list-checkin-guide.component.html',
  styleUrls: ['./list-checkin-guide.component.scss']
})
export class ListCheckinGuideComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  //Lấy danh sách tất cả các cộng tác viên
  modalData: ModalData<CongTacVien> = new ModalData<CongTacVien>();
  listCtvs: Paginate<CongTacVien> = new Paginate<CongTacVien>();
  searchValue = '';

  lsctv = [
    { id: 1, mssv: '171001', maDoan: '01', trangThai: true },
    { id: 2, mssv: '171002', maDoan: '01', trangThai: true },
    { id: 3, mssv: '171002', maDoan: '02', trangThai: false },
    { id: 4, mssv: '171003', maDoan: '01', trangThai: true },
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private diemDanhCtvSvc: DiemDanhCongTacVienService,
  ) { }

  //Lọc ra các chuyến tham quan của cộng tác viên hiện tại
  check(){
    return this.lsctv.filter(x => x.mssv === '171002');
  }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(): void {
    this.spinner.show();
    this.diemDanhCtvSvc.getAllPaging(
      this.listCtvs.currentPage - 1,
      this.listCtvs.limit,
      this.searchValue)
      .subscribe(res => {
        this.listCtvs.currentPage = res.pageable.pageNumber + 1;
        this.listCtvs.limit = res.pageable.pageSize;
        this.listCtvs.totalPage = res.totalPages;
        this.listCtvs.totalItem = res.totalElements;
        this.listCtvs.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<unknown>, data?: CongTacVien): void {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }
    this.nzModalSvc.create({
      nzStyle: { top: '20px' },
      nzWidth: 500,
      nzTitle: (data ? this.langData[this.langCode].CHINH_SUA_TITLE :
        this.langData[this.langCode].THEM_MOI_TITLE) + this.langData[this.langCode].DIEM_DANH,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean): void {
    if (reload) {
      this.listCtvs.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalSvc.closeAll();
  }

  pageChange(page: Paginate<CongTacVien>): void {
    this.listCtvs = page;
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
        this.diemDanhCtvSvc.delete(id)
          .subscribe(() => {
            this.spinner.hide();
            this.alert.success(this.langData[this.langCode].THAY_DOI_THANH_CONG);
            this.getDataPaging();
          }, () => this.spinner.hide());
      }
    });
  }

}
