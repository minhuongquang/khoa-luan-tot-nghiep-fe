import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss', '../../../../assets/theme/css/main.css']
})
export class MainHeaderComponent implements OnInit {

  isLogin = false;
  isSinhVien = false;
  isGiangVien = false;
  isNgoaiTruong = false;

  userName = 'User';
  userAvatarLink = '';

  showCart = false;

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  constructor(
    private router: Router,
    private authSvc: AuthenticateService,
  ) {}

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    if (lang) {
      this.langCode = lang;
    } else {
      localStorage.setItem('language', 'en');
      this.langCode = 'en';
    }
  }

  onLogOut(): void {
    this.authSvc.doLogout();
  }

  switchLang(lang: string): void {
    localStorage.setItem('language', lang);
    window.location.reload();
  }

}
