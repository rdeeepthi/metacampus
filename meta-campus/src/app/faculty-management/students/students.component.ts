import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  email: string;
  contact: string;
  dob: string;
  course: string;
  semester: string;
  section: string;
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  examResults: ExamResult[];
  feedback: Feedback[];
  academicHistory: AcademicRecord[];
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'leave';
}

interface Assignment {
  id: number;
  title: string;
  status: 'submitted' | 'pending';
  submissionDate?: string;
  grade?: string;
  feedback?: string;
}

interface ExamResult {
  examType: string;
  score: number;
  totalMarks: number;
  date: string;
}

interface Feedback {
  id: number;
  message: string;
  date: string;
  facultyRemarks?: string;
}

interface AcademicRecord {
  semester: string;
  courses: CourseGrade[];
}

interface CourseGrade {
  courseName: string;
  grade: string;
  credits: number;
}

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  activeTab: string = 'roster';
  searchForm: FormGroup;
  attendanceForm: FormGroup;
  
  // Sample data - replace with API calls
  students: Student[] = [
    {
      id: 1,
      name: 'John Smith',
      rollNumber: 'CS2023001',
      email: 'john.smith@college.edu',
      contact: '+1234567890',
      dob: '2000-05-15',
      course: 'Computer Science',
      semester: 'Fall 2023',
      section: 'A',
      attendance: [
        { date: '2023-09-01', status: 'present' },
        { date: '2023-09-08', status: 'absent' }
      ],
      assignments: [
        { id: 1, title: 'Programming Assignment 1', status: 'submitted', grade: 'A', feedback: 'Excellent work' },
        { id: 2, title: 'Database Project', status: 'pending' }
      ],
      examResults: [
        { examType: 'Midterm', score: 85, totalMarks: 100, date: '2023-10-15' },
        { examType: 'Quiz 1', score: 18, totalMarks: 20, date: '2023-09-20' }
      ],
      feedback: [
        { id: 1, message: 'The course material is very comprehensive', date: '2023-09-25' }
      ],
      academicHistory: [
        {
          semester: 'Spring 2023',
          courses: [
            { courseName: 'Data Structures', grade: 'B+', credits: 3 },
            { courseName: 'Discrete Math', grade: 'A-', credits: 3 }
          ]
        }
      ]
    },
    // Add more sample students as needed
  ];

  filteredStudents: Student[] = [];
  selectedStudent: Student | null = null;
  selectedAssignment: Assignment | null = null;
  selectedExam: ExamResult | null = null;
  selectedFeedback: Feedback | null = null;

  // Filter options
  courses: string[] = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Business Administration'];
  semesters: string[] = ['Fall 2023', 'Spring 2023', 'Fall 2022'];
  sections: string[] = ['A', 'B', 'C'];

  // Performance metrics
  classAverage: number = 0;
  attendanceRate: number = 0;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: [''],
      courseFilter: [''],
      semesterFilter: [''],
      sectionFilter: ['']
    });

    this.attendanceForm = this.fb.group({
      date: [new Date().toISOString().substring(0, 10)],
      status: ['present']
    });
  }

  ngOnInit(): void {
    this.filteredStudents = [...this.students];
    this.calculatePerformanceMetrics();
  }

  calculatePerformanceMetrics(): void {
    if (this.students.length === 0) return;
    
    // Calculate class average
    const totalScores = this.students.flatMap(s => 
      s.examResults.map(e => (e.score / e.totalMarks) * 100)
    );
    this.classAverage = totalScores.reduce((a, b) => a + b, 0) / totalScores.length;
    
    // Calculate attendance rate
    const attendanceRecords = this.students.flatMap(s => s.attendance);
    const presentCount = attendanceRecords.filter(a => a.status === 'present').length;
    this.attendanceRate = (presentCount / attendanceRecords.length) * 100;
  }

  applyFilters(): void {
    const filters = this.searchForm.value;
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = !filters.searchQuery || 
        student.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesCourse = !filters.courseFilter || student.course === filters.courseFilter;
      const matchesSemester = !filters.semesterFilter || student.semester === filters.semesterFilter;
      const matchesSection = !filters.sectionFilter || student.section === filters.sectionFilter;
      
      return matchesSearch && matchesCourse && matchesSemester && matchesSection;
    });
  }

  selectStudent(student: Student): void {
    this.selectedStudent = student;
    this.activeTab = 'profile';
  }

  markAttendance(): void {
    const { date, status } = this.attendanceForm.value;
    this.filteredStudents.forEach(student => {
      if (!student.attendance.some(a => a.date === date)) {
        student.attendance.push({ date, status });
      }
    });
    this.calculatePerformanceMetrics();
  }

  getAssignmentStatus(student: Student): { submitted: number; pending: number } {
    const submitted = student.assignments.filter(a => a.status === 'submitted').length;
    return {
      submitted,
      pending: student.assignments.length - submitted
    };
  }

  getStudentPerformance(student: Student): number {
    if (student.examResults.length === 0) return 0;
    return student.examResults.reduce((sum, exam) => 
      sum + (exam.score / exam.totalMarks) * 100, 0) / student.examResults.length;
  }

  getCoursesBySemester(student: Student, semester: string): CourseGrade[] {
    const record = student.academicHistory.find(h => h.semester === semester);
    return record ? record.courses : [];
  }
  getAttendancePercentage(student: any): string {
  if (!student.attendance || student.attendance.length === 0) {
    return '0.0';
  }
  const presentCount = student.attendance.filter((a: { status: string; }) => a.status === 'present').length;
  const percentage = (presentCount / student.attendance.length) * 100;
  return percentage.toFixed(1);
}

getAttendancePercentageDisplay(): string {
  if (!this.selectedStudent || !this.selectedStudent.attendance || this.selectedStudent.attendance.length === 0) {
    return '0.0';
  }

  const presentDays = this.selectedStudent.attendance.filter(a => a.status === 'present').length;
  const totalDays = this.selectedStudent.attendance.length;
  const percentage = (presentDays / totalDays) * 100;

  return percentage.toFixed(1);
}

calculateAttendancePercentage(student: any): string {
  if (!student || !student.attendance || student.attendance.length === 0) {
    return '0.0';
  }

  const presentDays = student.attendance.filter((a: any) => a.status === 'present').length;
  const totalDays = student.attendance.length;
  const percentage = (presentDays / totalDays) * 100;

  return percentage.toFixed(1);
}

// Calculate average grade for assignments (convert letter grades to numerical values)
// Calculate average grade for assignments (convert letter grades to numerical values)
calculateAssignmentAverage(student: Student): string {
  if (!student.assignments || student.assignments.length === 0) return '';
  
  const submittedAssignments = student.assignments.filter(a => a.status === 'submitted' && a.grade);
  if (submittedAssignments.length === 0) return '';

  // Convert letter grades to numerical values for calculation
  const gradeValues = submittedAssignments.map(assignment => {
    switch(assignment.grade?.toUpperCase()) {
      case 'A+': return 4.3;
      case 'A': return 4.0;
      case 'A-': return 3.7;
      case 'B+': return 3.3;
      case 'B': return 3.0;
      case 'B-': return 2.7;
      case 'C+': return 2.3;
      case 'C': return 2.0;
      case 'C-': return 1.7;
      case 'D+': return 1.3;
      case 'D': return 1.0;
      case 'F': return 0.0;
      default: return 0.0; // Unknown grade
    }
  });

  // Fix: Explicitly type the initial value as number
  const average = gradeValues.reduce((sum: number, val: number) => sum + val, 0) / gradeValues.length;
  
  // Convert back to letter grade for display
  if (average >= 4.0) return 'A';
  if (average >= 3.7) return 'A-';
  if (average >= 3.3) return 'B+';
  if (average >= 3.0) return 'B';
  if (average >= 2.7) return 'B-';
  if (average >= 2.3) return 'C+';
  if (average >= 2.0) return 'C';
  if (average >= 1.7) return 'C-';
  if (average >= 1.3) return 'D+';
  if (average >= 1.0) return 'D';
  return 'F';
}

// Get unique dates from all students' attendance records
getUniqueDates(): string[] {
  const allDates = new Set<string>();
  this.students.forEach(student => {
    student.attendance.forEach(record => {
      allDates.add(record.date);
    });
  });
  return Array.from(allDates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}

// Get attendance status for a specific student on a specific date
getAttendanceStatus(student: Student, date: string): string | null {
  const record = student.attendance.find(a => a.date === date);
  return record ? record.status : null;
}
}