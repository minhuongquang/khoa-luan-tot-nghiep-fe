/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from 'src/environments/environment';

export const UrlConstant = {
  API: {
    // File
    FILE: environment.serverFileUrl + 'rest/file',

    // Main
    LOGIN_ADMIN: environment.serverUrl + 'rest/login/admin',

    // Catalog
    ACADEMIC_RANKS: environment.serverUrl + 'rest/hoc-ham',
    DEGREE_RANKS: environment.serverUrl + 'rest/hoc-vi',
    RESEARCH_DOMAINS: environment.serverUrl + 'rest/linh-vuc',
    FACULTIES: environment.serverUrl + 'rest/khoa',
    MAJOR: environment.serverUrl + 'rest/nganh',
    LOCATIONS: environment.serverFileUrl + 'rest/dia-diem',
    TOUR_TIMES: environment.serverFileUrl + 'rest/dot-tham-quan',
    //Setting
    COMMON_SETTINGS: environment.serverUrl + 'rest/cau-hinh-he-thong',
    MAJORS: environment.serverUrl + 'rest/nganh',
  },

  ROUTE: {
    LOGIN: '/login',
    MAIN: {
      HOME: '/',
    },
    MANAGEMENT: {
      DASHBOARD: '/management/dashboard',

      CATEGORIES: '/management/categories',
      ACADEMIC_RANKS: '/management/categories/academic-ranks',
      DEGREE_RANKS: '/management/categories/degree-ranks',
      RESEARCH_DOMAINS: '/management/categories/research-domains',
      FACULTIES: '/management/categories/faculties',
      MAJORS: '/management/categories/majors',
      LOCATIONS: '/management/categories/locations',
      TOUR_ITMES: '/management/categories/tour-times',

      CAU_HINH: '/management/settings',
      COMMON_SETTINGS: '/management/settings/common',

    },
  }
};
