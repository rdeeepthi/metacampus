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
import { AcademicComponent } from './admin/navbar/academic/academic.component';
import { AssignmentsAndMaterialsComponent } from './admin/navbar/assignments-and-materials/assignments-and-materials.component';
import { AttendanceComponent } from './admin/navbar/attendance/attendance.component';
import { ExaminationsComponent } from './admin/navbar/examinations/examinations.component';
import { FacultyAndStaffComponent } from './admin/navbar/faculty-and-staff/faculty-and-staff.component';
import { FeeManagementComponent } from './admin/navbar/fee-management/fee-management.component';
import { HostelComponent } from './admin/navbar/hostel/hostel.component';
import { LibraryComponent } from './admin/navbar/library/library.component';
import { LogoutComponent } from './admin/navbar/logout/logout.component';
import { PlacementsComponent } from './admin/navbar/placements/placements.component';
import { ReportsAndAnalyticsComponent } from './admin/navbar/reports-and-analytics/reports-and-analytics.component';
import { StudentManagementComponent } from './admin/navbar/student-management/student-management.component';
import { SystemSettingsComponent } from './admin/navbar/system-settings/system-settings.component';
import { TimetableComponent } from './admin/navbar/timetable/timetable.component';


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
    {path:'academic',component:AcademicComponent},
    {path:'assignments-and-materials',component:AssignmentsAndMaterialsComponent},
    {path:'attendence',component:AttendanceComponent},
    {path:'communication',component:CommunicationComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'examinations',component:ExaminationsComponent},
    {path:'faculty-and-staff',component:FacultyAndStaffComponent},
    {path:'fee-management',component:FeeManagementComponent},
    {path:'hostel',component:HostelComponent},
    {path:'library',component:LibraryComponent},
    {path:'logout',component:LogoutComponent}, 
    {path:'placements',component:PlacementsComponent},
    {path:'reports-and-analytics',component:ReportsAndAnalyticsComponent},
    {path:'student-management',component:StudentManagementComponent},
    {path:'system-settings',component:SystemSettingsComponent},
    {path:'timetable',component:TimetableComponent},
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path: '**', redirectTo: 'dashboard' }
];
