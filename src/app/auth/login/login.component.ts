import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AuthenticateService } from 'src/app/core/services/auth/authenticate.service';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../assets/theme/css/main.css']
})
export class LoginComponent implements OnInit {

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  //////////////////////////////

  form: FormGroup;
  showPassLogin = false;
  listRoles = [
    { id: 'ROLE_ADMIN', title: { vi: 'Quản trị viên', en: 'Administrator' } },
    { id: 'ROLE_THU_KY_KHOA', title: { vi: 'Thư ký khoa', en: 'Secretary' } },
    { id: 'ROLE_GIANG_VIEN', title: { vi: 'Giảng viên', en: 'Lecturer' } },
    { id: 'ROLE_CA_NHAN', title: { vi: 'Cá nhân ngoài trường', en: 'Individual' } },
    { id: 'ROLE_SINH_VIEN', title: { vi: 'Sinh viên', en: 'Student' } },
  ];
  selectedRoleId: string = null;

  isFieldValid = this.formValidatorSvc.isFieldValid;
  displayFieldCss = this.formValidatorSvc.displayFieldCss;

  constructor(
    private fb: FormBuilder,
    private formValidatorSvc: FormValidatorService,
    private authSvc: AuthenticateService,
    private socialLoginSvc: SocialAuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    const savedRole = localStorage.getItem('savedRole');
    if (savedRole && this.listRoles.map(x => x.id).includes(savedRole)) {
      this.selectedRoleId = savedRole;
    } else {
      this.selectedRoleId = 'ROLE_SINH_VIEN';
      localStorage.setItem('savedRole', 'ROLE_SINH_VIEN');
    }
    this.createFormGroupLogin();
  }

  createFormGroupLogin(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  savingChangedRole(role: string): void {
    localStorage.setItem('savedRole', role);
  }

  toggleShowPassLogin(): void {
    this.showPassLogin = !this.showPassLogin;
  }

  onLoginWithForm(): void {
    switch (this.selectedRoleId) {
      case 'ROLE_ADMIN' || 'ROLE_THU_KY_KHOA':
        this.adminAndSecretaryLoginForm();
        break;
      case 'ROLE_GIANG_VIEN':

        break;
      case 'ROLE_CA_NHAN':

        break;
      case 'ROLE_SINH_VIEN':

        break;

      default:
        break;
    }
  }

  onLoginWithGoogle(): void {
    this.socialLoginSvc.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.spinner.show();
        if (user) {
          switch (this.selectedRoleId) {
            case 'ROLE_ADMIN' || 'ROLE_THU_KY_KHOA':
              this.adminAndSecretaryLoginGoogle(user.idToken);
              break;
            case 'ROLE_GIANG_VIEN':

              break;
            case 'ROLE_CA_NHAN':

              break;
            case 'ROLE_SINH_VIEN':

              break;

            default:
              break;
          }
        }
      }
    );
  }

  adminAndSecretaryLoginForm(): void {
    if (this.form.valid) {
      this.authSvc.doLoginAdminSecretaryForm(this.form.value)
        .subscribe(res => {
          this.authSvc.setAuthData(res);
          this.router.navigateByUrl(UrlConstant.ROUTE.MANAGEMENT.DASHBOARD);
        });
    } else {
      this.formValidatorSvc.validateAllFormFields(this.form);
    }
  }

  adminAndSecretaryLoginGoogle(token: string): void {
    this.authSvc.doLoginAdminSecretaryGoogle(token)
      .subscribe(res => {
        this.authSvc.setAuthData(res);
        this.router.navigateByUrl(UrlConstant.ROUTE.MANAGEMENT.DASHBOARD);
      });
  }

}
