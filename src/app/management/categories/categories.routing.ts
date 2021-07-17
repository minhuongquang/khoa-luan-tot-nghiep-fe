import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'academic-ranks',
        pathMatch: 'full',
      },
      {
        path: 'academic-ranks',
        loadChildren: () => import('./academic-ranks/academic-ranks.module').then(m => m.AcademicRanksModule)
      },
      {
        path: 'majors',
        loadChildren: () => import('./majors/majors.module').then(m => m.MajorsModule)
      },
      {
        path: 'degree-ranks',
        loadChildren: () => import('./degree-ranks/degree-ranks.module').then(m => m.DegreeRanksModule),
      },
      {
        path: 'faculties',
        loadChildren: () => import('./faculties/faculties.module').then(m => m.FacultiesModule),
      },

      {
        path: 'research-domains',
        loadChildren: () => import('./research-domains/research-domains.module').then(m => m.ResearchDomainsModule),
      },
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
      },
      {
        path: 'tour-times',
        loadChildren: () => import('./tour-times/tour-times.module').then(m => m.TourTimesModule),
      },
    ],
  },
];
