import { Routes } from '@angular/router';
import { DashboardComponent } from './student-management/dashboard/dashboard.component';
import { ProfileComponent } from './student-management/profile/profile.component';


export const routes: Routes = [
    {path:'dashboard', component:DashboardComponent},
    {path:'profile', component:ProfileComponent},
    { path: '**', redirectTo: 'dashboard' }
];
