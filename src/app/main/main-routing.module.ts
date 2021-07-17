import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'sign-up-for-a-tour',
        loadChildren: () => import('./sign-up-for-a-tour/sign-up-for-a-tour.module').then(m => m.SignUpForATourModule),
      },
      {
        path: 'sign-up-for-a-tour-contacted',
        loadChildren: () => import('./sign-up-for-a-tour-contacted/sign-up-for-a-tour-contacted.module')
          .then(m => m.SignUpForATourContactedModule),
      },
      {
        path: 'registration-for-lead-the-delegation',
        loadChildren: () => import('./registration-for-lead-the-delegation/registration-for-lead-the-delegation.module')
          .then(m => m.RegistrationForLeadTheDelegationModule),
      },
      {
        path: 'submit-post-after-the-tour',
        loadChildren: () => import('./submit-post-after-the-tour/submit-post-after-the-tour.module')
          .then(m => m.SubmitPostAfterTheTourModule),
      },
      {
        path: 'tours',
        loadChildren: () => import('./lecturer/tours/tours.module').then(m => m.ToursModule),
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
      },
      {
        path: 'checkin',
        loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule),
      },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
