
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Sample data - replace with API calls
  kpis = {
    totalStudents: 1250,
    totalFaculty: 85,
    totalCourses: 42,
    activeAssignments: 23,
    pendingPayments: 47,
    ongoingExams: 5,
    totalDepartments: 8
  };

  attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    values: [85, 82, 88, 90, 86]
  };

  examResults = {
    pass: 78,
    fail: 22
  };

  feeCollection = {
    collected: 85,
    pending: 15
  };

  topPerformers = [
    { name: 'John Doe', program: 'B.Tech CS', score: 98 },
    { name: 'Jane Smith', program: 'B.Tech EE', score: 97 },
    { name: 'Alex Johnson', program: 'BBA', score: 96 },
    { name: 'Sarah Williams', program: 'MBA', score: 95 },
    { name: 'Michael Brown', program: 'B.Tech ME', score: 94 }
  ];

  upcomingEvents = [
    { date: new Date('2023-11-15'), title: 'Mid-Term Exams', type: 'exam' },
    { date: new Date('2023-11-20'), title: 'Data Structures Assignment Due', type: 'assignment' },
    { date: new Date('2023-11-25'), title: 'Parent-Teacher Meeting', type: 'meeting' },
    { date: new Date('2023-12-01'), title: 'College Anniversary', type: 'event' }
  ];

  announcements = [
    { title: 'System Maintenance Tonight', content: 'Portal will be unavailable from 10 PM to 12 AM for maintenance.', date: new Date('2023-11-10'), priority: 'high' },
    { title: 'New Library Rules', content: 'Please review the updated library policies on the portal.', date: new Date('2023-11-05'), priority: 'medium' }
  ];

  pendingTasks = [
    { title: 'Unapproved Leave Requests', count: 12, icon: '🔔', link: '/admin/leave-requests' },
    { title: 'Unread Messages', count: 5, icon: '📩', link: '/admin/messages' },
    { title: 'Pending Submissions', count: 8, icon: '⏳', link: '/admin/submissions' },
    { title: 'Students with Low Attendance', count: 15, icon: '📋', link: '/admin/attendance' }
  ];

  quickActions = [
    { title: 'Add New Student', icon: '👨‍🎓', link: '/admin/add-student' },
    { title: 'Add New Faculty', icon: '👩‍🏫', link: '/admin/add-faculty' },
    { title: 'Upload Assignment', icon: '📤', link: '/admin/upload-assignment' },
    { title: 'Send Payment Reminders', icon: '🧾', link: '/admin/payment-reminders' },
    { title: 'View Leave Requests', icon: '📥', link: '/admin/leave-requests' },
    { title: 'Add Book to Library', icon: '📚', link: '/admin/add-book' },
    { title: 'Assign Bus Route', icon: '🚌', link: '/admin/bus-routes' }
  ];

  systemHealth = {
    status: 'Operational',
    uptime: '99.9%',
    lastBackup: new Date('2023-11-09'),
    loginsToday: 342
  };

  // Chart options - in a real app, use a charting library
  getAttendanceChart() {
    return {
      labels: this.attendanceData.labels,
      datasets: [{
        label: 'Attendance %',
        data: this.attendanceData.values,
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1
      }]
    };
  }

  getExamResultsChart() {
    return {
      labels: ['Pass', 'Fail'],
      datasets: [{
        data: [this.examResults.pass, this.examResults.fail],
        backgroundColor: ['#2ecc71', '#e74c3c']
      }]
    };
  }

  getFeeCollectionChart() {
    return {
      labels: ['Collected', 'Pending'],
      datasets: [{
        data: [this.feeCollection.collected, this.feeCollection.pending],
        backgroundColor: ['#2ecc71', '#f39c12']
      }]
    };
  }
}