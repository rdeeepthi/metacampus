import { Routes } from '@angular/router';
import { DashboardComponent } from './faculty-management/dashboard/dashboard.component';
import { CoursesComponent } from './faculty-management/courses/courses.component';
import { AssessmentsComponent } from './faculty-management/assessments/assessments.component';
import { CommunicationComponent } from './faculty-management/communication/communication.component';
import { AdministrationComponent } from './faculty-management/administration/administration.component';
import { ResourcesComponent } from './faculty-management/resources/resources.component';
import { StudentsComponent } from './faculty-management/students/students.component';
import { FacultyToolsComponent } from './faculty-management/faculty-tools/faculty-tools.component';
import { ExamScheduleComponent } from './faculty-management/exam-schedule/exam-schedule.component';


export const routes: Routes = [
    {path:'students', component:StudentsComponent},
    {path:'courses', component: CoursesComponent},
    {path:'dashboard', component: DashboardComponent},
    {path:'assessments', component: AssessmentsComponent},
    {path:'communication', component: CommunicationComponent},
    {path:'administration', component: AdministrationComponent},
    {path:'faculty-tools', component: FacultyToolsComponent},
    {path:'resources', component:ResourcesComponent},
    {path:'exam-schedule',component:ExamScheduleComponent},
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path: '**', redirectTo: 'dashboard' }
];
