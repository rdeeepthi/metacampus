import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FacultyDashboard {
  title: string;
  currentDate: Date;
  summaryCards: SummaryCard[];
  scheduleWidget: ScheduleWidget;
  alertsWidget: AlertsWidget;
  quickActionsWidget: QuickActionsWidget;
  announcementsWidget: AnnouncementsWidget;
  attendanceWidget: AttendanceWidget;
  coursesWidget: CoursesWidget;
}

interface SummaryCard {
  iconClass: string;
  cardTitle: string;
  cardValue: string | number;
  subText?: string;
  isAlert?: boolean;
}

interface ScheduleWidget {
  title: string;
  viewAllText: string;
  classes: ClassSchedule[];
  emptyMessage: string;
}

interface ClassSchedule {
  scheduleTime: string;
  course: {
    courseCode: string;
    courseName: string;
  };
  location: {
    roomNumber: string;
    building?: string;
  };
  classType: string;
}

interface AlertsWidget {
  title: string;
  alerts: StudentAlert[];
  emptyMessage: string;
}

interface StudentAlert {
  alertLevel: 'high' | 'medium' | 'low';
  iconClass: string;
  alertType: string;
  student: {
    studentId: string;
    firstName: string;
    lastName: string;
  };
  course: {
    courseCode: string;
    courseName?: string;
  };
  additionalInfo?: string;
}

interface QuickActionsWidget {
  title: string;
  actions: QuickAction[];
}

interface QuickAction {
  iconClass: string;
  actionLabel: string;
  actionType: string;
}

interface AnnouncementsWidget {
  title: string;
  items: Announcement[];
}

interface Announcement {
  announcementType: 'admin' | 'department' | 'university';
  iconClass: string;
  announcementTitle: string;
  announcementContent: string;
  postDate: Date;
  author?: {
    name: string;
    role?: string;
  };
}

interface AttendanceWidget {
  title: string;
  stats?: AttendanceStat[];
}

interface AttendanceStat {
  label: string;
  value: string | number;
}

interface CoursesWidget {
  title: string;
  courses: Course[];
}

interface Course {
  courseCode: string;
  courseName: string;
  enrolledStudents: any[]; // Can be refined with Student interface
  creditHours: number;
  department: {
    name: string;
    code?: string;
  };
  semester: string;
  completionPercentage: number;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('attendanceChart', { static: true }) attendanceChartRef!: ElementRef;

  facultyDashboard: FacultyDashboard = {
    title: 'Faculty Dashboard',
    currentDate: new Date(),
    summaryCards: [],
    scheduleWidget: {
      title: "Today's Schedule",
      viewAllText: "View Weekly",
      classes: [],
      emptyMessage: "No classes scheduled for today"
    },
    alertsWidget: {
      title: "Student Alerts",
      alerts: [],
      emptyMessage: "No active alerts"
    },
    quickActionsWidget: {
      title: "Quick Actions",
      actions: []
    },
    announcementsWidget: {
      title: "Announcements",
      items: []
    },
    attendanceWidget: {
      title: "Attendance Overview",
      stats: []
    },
    coursesWidget: {
      title: "Course Summary",
      courses: []
    }
  };

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeData();
    this.createAttendanceChart();
  }

  initializeData(): void {
    this.loadSummaryCards();
    this.loadTodaysClasses();
    this.loadStudentAlerts();
    this.loadQuickActions();
    this.loadAnnouncements();
    this.loadCourses();
    this.loadAttendanceStats();
  }

  private loadSummaryCards(): void {
    this.facultyDashboard.summaryCards = [
      { 
        iconClass: 'fas fa-chalkboard-teacher', 
        cardTitle: "Today's Classes", 
        cardValue: 3, 
        subText: 'Next: CS101 at 10:00 AM' 
      },
      { 
        iconClass: 'fas fa-clipboard-check', 
        cardTitle: "Pending Assignments", 
        cardValue: 7, 
        subText: '3 overdue', 
        isAlert: true 
      },
      { 
        iconClass: 'fas fa-calendar-check', 
        cardTitle: "Upcoming Exams", 
        cardValue: 2, 
        subText: 'Next week' 
      },
      { 
        iconClass: 'fas fa-envelope', 
        cardTitle: "New Messages", 
        cardValue: 5, 
        isAlert: true 
      },
      { 
        iconClass: 'fas fa-calendar-minus', 
        cardTitle: "Leave Status", 
        cardValue: 'Approved', 
        subText: '2 days' 
      },
      { 
        iconClass: 'fas fa-comment-alt', 
        cardTitle: "Student Feedback", 
        cardValue: '3 new', 
        isAlert: true 
      }
    ];
  }

  private loadTodaysClasses(): void {
    this.facultyDashboard.scheduleWidget.classes = [
      { 
        scheduleTime: '09:00 AM',
        course: {
          courseCode: 'CS101',
          courseName: 'Introduction to Programming'
        },
        location: {
          roomNumber: '302',
          building: 'Science Block'
        },
        classType: 'Lecture'
      },
      { 
        scheduleTime: '11:00 AM',
        course: {
          courseCode: 'CS201',
          courseName: 'Data Structures'
        },
        location: {
          roomNumber: 'Lab 105'
        },
        classType: 'Practical'
      }
    ];
  }

  private loadStudentAlerts(): void {
    this.facultyDashboard.alertsWidget.alerts = [
      { 
        alertLevel: 'medium',
        iconClass: 'fas fa-user-clock',
        alertType: 'Low Attendance',
        student: {
          studentId: 'S1001',
          firstName: 'John',
          lastName: 'Doe'
        },
        course: {
          courseCode: 'CS101'
        },
        additionalInfo: 'Attendance below 60%'
      },
      { 
        alertLevel: 'high',
        iconClass: 'fas fa-graduation-cap',
        alertType: 'Failing Grade',
        student: {
          studentId: 'S1042',
          firstName: 'Jane',
          lastName: 'Smith'
        },
        course: {
          courseCode: 'CS201'
        }
      }
    ];
  }

  private loadQuickActions(): void {
    this.facultyDashboard.quickActionsWidget.actions = [
      { 
        iconClass: 'fas fa-plus-circle', 
        actionLabel: 'Create Assignment', 
        actionType: 'createAssignment' 
      },
      { 
        iconClass: 'fas fa-upload', 
        actionLabel: 'Upload Material', 
        actionType: 'uploadMaterial' 
      },
      { 
        iconClass: 'fas fa-clipboard-list', 
        actionLabel: 'View Attendance', 
        actionType: 'viewAttendance' 
      },
      { 
        iconClass: 'fas fa-calendar-plus', 
        actionLabel: 'Add Exam', 
        actionType: 'addExam' 
      },
      { 
        iconClass: 'fas fa-file-alt', 
        actionLabel: 'Submit Report', 
        actionType: 'submitReport' 
      },
      { 
        iconClass: 'fas fa-comments', 
        actionLabel: 'Send Message', 
        actionType: 'sendMessage' 
      }
    ];
  }

  private loadAnnouncements(): void {
    this.facultyDashboard.announcementsWidget.items = [
      { 
        announcementType: 'admin',
        iconClass: 'fas fa-cog',
        announcementTitle: 'System Maintenance',
        announcementContent: 'The system will be down for maintenance this weekend.',
        postDate: new Date('2023-06-10'),
        author: {
          name: 'System Admin',
          role: 'Administrator'
        }
      },
      { 
        announcementType: 'department',
        iconClass: 'fas fa-building',
        announcementTitle: 'Department Meeting',
        announcementContent: 'Monthly department meeting scheduled for next Monday.',
        postDate: new Date('2023-06-12')
      }
    ];
  }

  private loadCourses(): void {
    this.facultyDashboard.coursesWidget.courses = [
      { 
        courseCode: 'CS101',
        courseName: 'Introduction to Programming',
        enrolledStudents: Array(45).fill({}), // Placeholder for actual student objects
        creditHours: 3,
        department: {
          name: 'Computer Science',
          code: 'CS'
        },
        semester: 'Fall 2023',
        completionPercentage: 65
      },
      { 
        courseCode: 'CS201',
        courseName: 'Data Structures',
        enrolledStudents: Array(38).fill({}),
        creditHours: 4,
        department: {
          name: 'Computer Science',
          code: 'CS'
        },
        semester: 'Fall 2023',
        completionPercentage: 42
      }
    ];
  }

  private loadAttendanceStats(): void {
    this.facultyDashboard.attendanceWidget.stats = [
      { label: 'Total Students', value: 120 },
      { label: 'Average Attendance', value: '85%' },
      { label: 'Classes Taken', value: 24 },
      { label: 'Pending Records', value: 3 }
    ];
  }

  // Action Handlers
  handleQuickAction(actionType: string): void {
    console.log(`Action triggered: ${actionType}`);
    // Implement specific actions based on actionType
    // Example: this.router.navigate([actionType]);
  }

  viewWeeklySchedule(): void {
    console.log('View weekly schedule clicked');
    // Implement weekly schedule view logic
  }

  createAttendanceChart(): void {
    const ctx = this.attendanceChartRef.nativeElement.getContext('2d');
    
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent', 'Late', 'Excused'],
        datasets: [{
          data: [75, 10, 8, 7],
          backgroundColor: [
            '#4CAF50', // Green
            '#F44336', // Red
            '#FFC107', // Yellow
            '#2196F3'  // Blue
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}