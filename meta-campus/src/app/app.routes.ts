
import { Routes } from '@angular/router';
 
import { DashboardComponent } from './admin1/dashboard/dashboard.component';
import { AcademicComponent } from './admin1/academic/academic.component';
import { StudentManagementComponent } from './admin1/student-management/student-management.component';
import { StaffManagementComponent } from './admin1/staff-management/staff-management.component';
import { ExaminationsComponent } from './admin1/examinations/examinations.component';
import { AssignmentsMaterialsComponent } from './admin1/assignments-materials/assignments-materials.component';
import { TimetableComponent } from './admin1/timetable/timetable.component';
import { AttendanceComponent } from './admin1/attendance/attendance.component';
import { FeeManagementComponent } from './admin1/fee-management/fee-management.component';
import { LibraryComponent } from './admin1/library/library.component';
import { HostelComponent } from './admin1/hostel/hostel.component';
import { TransportComponent } from './admin1/transport/transport.component';
import { CommunicationComponent } from './admin1/communication/communication.component';
import { PlacementsComponent } from './admin1/placements/placements.component';
import { ReportsAnalyticsComponent } from './admin1/reports-analytics/reports-analytics.component';
import { SystemSettingsComponent } from './admin1/system-settings/system-settings.component';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'academic', component:  AcademicComponent },
    { path: 'timetable', component:  TimetableComponent },
    { path: 'attendance', component:  AttendanceComponent },
    { path: 'fee-management', component:  FeeManagementComponent },
    { path: 'library', component:  LibraryComponent },
    { path: 'hostel', component:  HostelComponent },
    { path: 'transport', component:  TransportComponent },
    { path: 'communication', component:  CommunicationComponent },
    { path: 'placements', component:  PlacementsComponent },
    { path: 'system-settings', component:  SystemSettingsComponent },
    { path: 'reports-analytics', component: ReportsAnalyticsComponent },
    { path: 'assignments-materials', component: AssignmentsMaterialsComponent },
    { path: 'examinations', component: ExaminationsComponent },
    { path: 'staff-management', component: StaffManagementComponent },
    { path: 'student-management', component:StudentManagementComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
