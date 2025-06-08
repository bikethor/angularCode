import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { GenderComponent } from './gender/gender.component';
import { UserRepComponent } from './user-rep/user-rep.component';
import { GenericFormComponent } from './generic-form/generic-form.component';

import { DashboardchartsComponent } from './dashboardcharts/dashboardcharts.component';
import { ApexchartsComponent } from './apexcharts/apexcharts.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        //{ path: 'charts', component: DashboardchartsComponent },
        { path: 'charts', component: ApexchartsComponent }, // /dashboard/charts
        { path: 'users', component: UsersComponent },      //users
        { path: 'gender', component: GenderComponent },      //gender
        { path: 'usersRep', component: UserRepComponent },   //usersRep
        { path: 'form', component: GenericFormComponent },  //  /dashboard/form
        { path: '', redirectTo: 'charts', pathMatch: 'full' } // default child
      ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
  ];
