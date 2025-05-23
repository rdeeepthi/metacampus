import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Exam {
  id: number;
  name: string;
  course: string;
  courseCode: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  type: 'Internal' | 'External' | 'Practical' | 'Quiz';
  mode: 'Offline' | 'Online';
  venue: string;
  description?: string;
  syllabusPortion?: string;
  questionPaper?: string;
  status: 'Scheduled' | 'Completed' | 'Evaluated' | 'Cancelled';
  invigilator?: string;
}

interface InvigilationDuty {
  id: number;
  examId: number;
  examName: string;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  status: 'Assigned' | 'Accepted' | 'Rejected';
}

@Component({
  selector: 'app-exam-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, FullCalendarModule],
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss']
})
export class ExamScheduleComponent implements OnInit {
   activeTab: string = 'calendar';
  exams: Exam[] = [];
  filteredExams: Exam[] = [];
  invigilationDuties: InvigilationDuty[] = [];
  isAddingExam: boolean = false;
  isViewingDetails: boolean = false;
  selectedExam?: Exam;
  selectedDate?: Date;
  calendarOptions: any;
  
  newExam: Exam = {
    id: 0,
    name: '',
    course: '',
    courseCode: '',
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    type: 'Internal',
    mode: 'Offline',
    venue: '',
    status: 'Scheduled'
  };

  filterOptions = {
    course: '',
    type: '',
    mode: '',
    status: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  };

  courses = ['CS101 - Introduction to Programming', 'MATH201 - Advanced Calculus', 'PHY301 - Quantum Physics'];
  venues = ['Main Hall', 'Lab 101', 'Block A Room 201', 'Online - Zoom'];
  examTypes = ['Internal', 'External', 'Practical', 'Quiz'];
  examModes = ['Offline', 'Online'];
  examStatuses = ['Scheduled', 'Completed', 'Evaluated', 'Cancelled'];

  ngOnInit(): void {
    this.initializeSampleData();
    this.setupCalendar();
    this.filterExams();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newExam.questionPaper = input.files[0].name;
    }
  }



  initializeSampleData(): void {
    // Sample exam data
    this.exams = [
      {
        id: 1,
        name: 'Mid Semester Test',
        course: 'Introduction to Programming',
        courseCode: 'CS101',
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        startTime: '09:00',
        endTime: '11:00',
        duration: 120,
        type: 'Internal',
        mode: 'Offline',
        venue: 'Main Hall',
        description: 'Covers chapters 1-4',
        status: 'Scheduled',
        invigilator: 'Prof. Smith'
      },
      {
        id: 2,
        name: 'Practical Exam',
        course: 'Advanced Calculus',
        courseCode: 'MATH201',
        date: new Date(new Date().setDate(new Date().getDate() + 10)),
        startTime: '14:00',
        endTime: '16:00',
        duration: 120,
        type: 'Practical',
        mode: 'Offline',
        venue: 'Lab 101',
        status: 'Scheduled'
      },
      {
        id: 3,
        name: 'Quiz 1',
        course: 'Quantum Physics',
        courseCode: 'PHY301',
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        startTime: '10:00',
        endTime: '10:30',
        duration: 30,
        type: 'Quiz',
        mode: 'Online',
        venue: 'Online - Zoom',
        status: 'Completed'
      }
    ];

    // Sample invigilation duties
    this.invigilationDuties = [
      {
        id: 1,
        examId: 1,
        examName: 'Mid Semester Test - CS101',
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        startTime: '09:00',
        endTime: '11:00',
        venue: 'Main Hall',
        status: 'Assigned'
      }
    ];
  }

  setupCalendar(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      events: this.exams.map(exam => ({
        title: `${exam.courseCode}: ${exam.name}`,
        start: exam.date,
        end: exam.date,
        extendedProps: {
          exam: exam
        },
        backgroundColor: this.getExamColor(exam.type),
        borderColor: this.getExamColor(exam.type),
        textColor: '#ffffff'
      })),
      eventClick: (info: any) => {
        this.selectedExam = info.event.extendedProps.exam;
        this.isViewingDetails = true;
      },
      dateClick: (info: any) => {
        this.selectedDate = new Date(info.dateStr);
        this.activeTab = 'list';
        this.filterExams();
      }
    };
  }

  getExamColor(type: string): string {
    switch(type) {
      case 'Internal': return '#3498db';
      case 'External': return '#e74c3c';
      case 'Practical': return '#2ecc71';
      case 'Quiz': return '#f39c12';
      default: return '#95a5a6';
    }
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'list') {
      this.filterExams();
    }
  }

  filterExams(): void {
    this.filteredExams = this.exams.filter(exam => {
      const matchesCourse = !this.filterOptions.course || 
        exam.courseCode.includes(this.filterOptions.course.split(' - ')[0]);
      const matchesType = !this.filterOptions.type || exam.type === this.filterOptions.type;
      const matchesMode = !this.filterOptions.mode || exam.mode === this.filterOptions.mode;
      const matchesStatus = !this.filterOptions.status || exam.status === this.filterOptions.status;
      const matchesDate = !this.selectedDate || 
        (exam.date.getDate() === this.selectedDate.getDate() &&
         exam.date.getMonth() === this.selectedDate.getMonth() &&
         exam.date.getFullYear() === this.selectedDate.getFullYear());
      const matchesMonth = exam.date.getMonth() + 1 === this.filterOptions.month;
      const matchesYear = exam.date.getFullYear() === this.filterOptions.year;

      return matchesCourse && matchesType && matchesMode && matchesStatus && 
             (this.activeTab === 'calendar' ? (matchesMonth && matchesYear) : matchesDate);
    });
  }

  addExam(): void {
    this.newExam.id = this.exams.length + 1;
    this.newExam.endTime = this.calculateEndTime(this.newExam.startTime, this.newExam.duration);
    this.exams.push({...this.newExam});
    this.isAddingExam = false;
    this.resetExamForm();
    this.setupCalendar(); // Refresh calendar
    this.filterExams();
  }

  calculateEndTime(startTime: string, duration: number): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  }

  resetExamForm(): void {
    this.newExam = {
      id: 0,
      name: '',
      course: '',
      courseCode: '',
      date: new Date(),
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      type: 'Internal',
      mode: 'Offline',
      venue: '',
      status: 'Scheduled'
    };
  }

  updateInvigilationStatus(duty: InvigilationDuty, status: 'Accepted' | 'Rejected'): void {
    duty.status = status;
  }

  exportSchedule(format: 'pdf' | 'excel'): void {
    // In a real app, this would generate and download the file
    alert(`Exporting schedule to ${format.toUpperCase()}...`);
  }

  viewLinkedAssessment(exam: Exam): void {
    // In a real app, this would navigate to assessment details
    this.selectedExam = exam;
    this.isViewingDetails = true;
  }
}