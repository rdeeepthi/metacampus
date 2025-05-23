import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  semester: string;
  section: string;
  status: 'active' | 'completed';
  credits: number;
  syllabus: string;
  outcomes: string[];
  faculty: string[];
  classStrength: number;
  materials: CourseMaterial[];
  timetable: ClassSchedule[];
  assignments: Assignment[];
  exams: Exam[];
  attendance: AttendanceRecord[];
  grades: Grade[];
}

interface CourseMaterial {
  id: number;
  type: 'lecture' | 'ppt' | 'reference' | 'video' | 'link';
  title: string;
  url: string;
  uploadDate: string;
  description?: string;
}

interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  submissions: Submission[];
  averageScore?: number;
}

interface Submission {
  studentId: number;
  studentName: string;
  submitDate?: string;
  status: 'submitted' | 'pending' | 'late';
  grade?: number;
  feedback?: string;
}

interface Exam {
  id: number;
  type: 'midterm' | 'final' | 'quiz' | 'test';
  date: string;
  time: string;
  location: string;
  totalMarks: number;
}

interface AttendanceRecord {
  date: string;
  present: number;
  absent: number;
  records: StudentAttendance[];
}

interface StudentAttendance {
  studentId: number;
  studentName: string;
  status: 'present' | 'absent' | 'leave';
}

interface Grade {
  studentId: number;
  studentName: string;
  internalMarks: number;
  examMarks: number;
  finalGrade: string;
}

@Component({
  imports:[CommonModule,RouterLink, ReactiveFormsModule],
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  activeTab: string = 'my-courses';
  searchForm: FormGroup;
  selectedCourse: Course | null = null;
  selectedMaterial: CourseMaterial | null = null;
  selectedAssignment: Assignment | null = null;
  selectedExam: Exam | null = null;

  // Sample data - replace with API calls
  courses: Course[] = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      description: 'Fundamentals of programming using Python',
      semester: 'Fall 2023',
      section: 'A',
      status: 'active',
      credits: 3,
      syllabus: 'Basic syntax, data structures, algorithms',
      outcomes: [
        'Understand programming fundamentals',
        'Develop problem-solving skills',
        'Write basic Python programs'
      ],
      faculty: ['Dr. Smith', 'Prof. Johnson'],
      classStrength: 45,
      materials: [
        {
          id: 1,
          type: 'lecture',
          title: 'Lecture 1 - Introduction',
          url: '/materials/lecture1.pdf',
          uploadDate: '2023-09-01'
        }
      ],
      timetable: [
        {
          day: 'Monday',
          startTime: '09:00',
          endTime: '10:30',
          location: 'Room 101'
        }
      ],
      assignments: [
        {
          id: 1,
          title: 'Python Basics',
          description: 'Complete the exercises',
          dueDate: '2023-09-15',
          submissions: [
            {
              studentId: 1,
              studentName: 'John Doe',
              submitDate: '2023-09-14',
              status: 'submitted',
              grade: 85,
              feedback: 'Good work'
            }
          ]
        }
      ],
      exams: [
        {
          id: 1,
          type: 'midterm',
          date: '2023-10-15',
          time: '10:00',
          location: 'Hall A',
          totalMarks: 100
        }
      ],
      attendance: [
        {
          date: '2023-09-01',
          present: 40,
          absent: 5,
          records: [
            {
              studentId: 1,
              studentName: 'John Doe',
              status: 'present'
            }
          ]
        }
      ],
      grades: [
        {
          studentId: 1,
          studentName: 'John Doe',
          internalMarks: 85,
          examMarks: 78,
          finalGrade: 'A-'
        }
      ]
    }
  ];

  filteredCourses: Course[] = [];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: [''],
      semesterFilter: [''],
      statusFilter: ['']
    });
  }

  ngOnInit(): void {
    this.filteredCourses = [...this.courses];
  }

  applyFilters(): void {
    const filters = this.searchForm.value;
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !filters.searchQuery || 
        course.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesSemester = !filters.semesterFilter || course.semester === filters.semesterFilter;
      const matchesStatus = !filters.statusFilter || course.status === filters.statusFilter;
      
      return matchesSearch && matchesSemester && matchesStatus;
    });
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
    this.activeTab = 'details';
  }

  getUniqueSemesters(): string[] {
    return [...new Set(this.courses.map(c => c.semester))];
  }

  getAssignmentStatus(assignment: Assignment): { submitted: number; pending: number; late: number } {
    const submitted = assignment.submissions.filter(s => s.status === 'submitted').length;
    const late = assignment.submissions.filter(s => s.status === 'late').length;
    return {
      submitted,
      pending: assignment.submissions.length - submitted - late,
      late
    };
  }

  calculateClassAverage(assignment: Assignment): number {
    if (!assignment.submissions || assignment.submissions.length === 0) return 0;
    const gradedSubmissions = assignment.submissions.filter(s => s.grade !== undefined);
    if (gradedSubmissions.length === 0) return 0;
    return gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length;
  }

  getAttendanceRate(course: Course): number {
    if (!course.attendance || course.attendance.length === 0) return 0;
    const totalRecords = course.attendance.reduce((sum, a) => sum + a.present + a.absent, 0);
    const presentRecords = course.attendance.reduce((sum, a) => sum + a.present, 0);
    return (presentRecords / totalRecords) * 100;
  }
}