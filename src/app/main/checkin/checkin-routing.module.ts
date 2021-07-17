import { Routes } from '@angular/router';

export const checkinRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'guide',
        loadChildren: () => import('./guide/guide.module').then(m => m.GuideModule)
      }
    ]
  }
];
