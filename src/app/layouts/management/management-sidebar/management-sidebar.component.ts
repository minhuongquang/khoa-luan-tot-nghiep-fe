import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  nameOfUser = '';
  avatarOfUser = '';

  isAdmin = false;

  listMenu: {
    icon: string;
    title: string;
    routerLink: string;
    isHaveChild: boolean;
    listChild: {
      icon: string;
      title: string;
      routerLink: string;
    }[];
  }[] = [];

  constructor(
    private authSvc: AuthenticateService,
  ) { }

  ngOnInit(): void {
    if (this.authSvc.checkRoleAdmin()) {
      this.isAdmin = true;
    }

    this.nameOfUser = this.authSvc.getNameOfLogin();
    this.avatarOfUser = this.authSvc.getAvatarOfLogin();

    this.listMenu = [
      {
        icon: 'fas fa-solar-panel', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].TONG_QUAN,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD,
        isHaveChild: false,
        listChild: []
      },
      {
        icon: 'pic-left', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].DANH_MUC,
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-certificate',
            title: this.langData[this.langCode].HOC_HAM,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.ACADEMIC_RANKS
          },
          {
            icon: 'fas fa-certificate',
            title: this.langData[this.langCode].HOC_VI,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.DEGREE_RANKS,
          },
          {
            icon: 'fas fa-university',
            title: this.langData[this.langCode].LINH_VUC,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.RESEARCH_DOMAINS,
          },
          {
            icon: 'fas fa-university',
            title: this.langData[this.langCode].KHOA,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.FACULTIES,
          },
          {
            icon: 'fas fa-book',
            title: this.langData[this.langCode].NGANH,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.MAJORS
          },
          {
            icon: 'fas fa-search-location',
            title: this.langData[this.langCode].DIA_DIEM,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.LOCATIONS
          },
          {
            icon: 'far fa-calendar-alt',
            title: this.langData[this.langCode].DOT_THAM_QUAN,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.TOUR_ITMES
          },
        ]
      },
      {
        icon: 'setting', // If have child, this icon must using from zorro
        title: this.langData[this.langCode].CAU_HINH,
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-envelope-open-text',
            title: this.langData[this.langCode].CAU_HINH_HE_THONG_CHUNG,
            routerLink: UrlConstant.ROUTE.MANAGEMENT.COMMON_SETTINGS
          },
        ]
      }
    ];
  }
}
