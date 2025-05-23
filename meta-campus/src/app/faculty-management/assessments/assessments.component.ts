import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Exam {
  id: number;
  title: string;
  type: 'Internal' | 'External' | 'Online';
  date: Date;
  duration: string;
  syllabus: string;
  questionPaperUrl?: string;
}

interface Assignment {
  id: number;
  title: string;
  instructions: string;
  dueDate: Date;
  attachmentUrl?: string;
  submissions: Submission[];
}

interface Submission {
  studentId: number;
  studentName: string;
  submissionDate: Date;
  status: 'Submitted' | 'Late' | 'Missing' | 'Incomplete';
  grade?: string;
  marks?: number;
  comments?: string;
}

interface GradeScheme {
  min: number;
  max: number;
  grade: string;
}

@Component({
  selector: 'app-assessments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {
  activeTab: string = 'exams';
  exams: Exam[] = [];
  assignments: Assignment[] = [];
  submissions: Submission[] = [];
  gradeSchemes: GradeScheme[] = [
    { min: 90, max: 100, grade: 'A' },
    { min: 80, max: 89, grade: 'B' },
    { min: 70, max: 79, grade: 'C' },
    { min: 60, max: 69, grade: 'D' },
    { min: 0, max: 59, grade: 'F' }
  ];
  newExam: Partial<Exam> = {};
  newAssignment: Partial<Assignment> = {};
  selectedExam?: Exam;
  selectedAssignment?: Assignment;
  showExamForm: boolean = false;
  showAssignmentForm: boolean = false;
  currentView: 'list' | 'details' | 'create' = 'list';
  performanceReport: any;
  assessmentCalendar: any[] = [];
  reevaluationRequests: any[] = [];
submission: any;

  ngOnInit(): void {
    // Initialize with mock data - replace with API calls in real implementation
    this.exams = [
      {
        id: 1,
        title: 'Mid-Semester Exam',
        type: 'Internal',
        date: new Date('2023-10-15'),
        duration: '2 hours',
        syllabus: 'Chapters 1-5',
        questionPaperUrl: '/assets/papers/mid-sem.pdf'
      },
      {
        id: 2,
        title: 'End-Semester Exam',
        type: 'External',
        date: new Date('2023-12-10'),
        duration: '3 hours',
        syllabus: 'All chapters',
      }
    ];

    this.assignments = [
      {
        id: 1,
        title: 'Data Structures Project',
        instructions: 'Implement a binary search tree with all operations',
        dueDate: new Date('2023-11-05'),
        submissions: [
          {
            studentId: 101,
            studentName: 'John Doe',
            submissionDate: new Date('2023-11-04'),
            status: 'Submitted',
            grade: 'A',
            marks: 95
          },
          {
            studentId: 102,
            studentName: 'Jane Smith',
            submissionDate: new Date('2023-11-06'),
            status: 'Late',
            grade: 'B',
            marks: 85
          }
        ]
      }
    ];

    this.generatePerformanceReport();
    this.generateAssessmentCalendar();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.currentView = 'list';
  }

  createExam(): void {
    if (this.newExam.title && this.newExam.date && this.newExam.duration) {
      const exam: Exam = {
        id: this.exams.length + 1,
        title: this.newExam.title!,
        type: this.newExam.type || 'Internal',
        date: new Date(this.newExam.date!),
        duration: this.newExam.duration!,
        syllabus: this.newExam.syllabus || 'To be announced',
        questionPaperUrl: this.newExam.questionPaperUrl
      };
      this.exams.push(exam);
      this.showExamForm = false;
      this.newExam = {};
      this.generateAssessmentCalendar();
    }
  }

  createAssignment(): void {
    if (this.newAssignment.title && this.newAssignment.dueDate) {
      const assignment: Assignment = {
        id: this.assignments.length + 1,
        title: this.newAssignment.title!,
        instructions: this.newAssignment.instructions || 'No specific instructions',
        dueDate: new Date(this.newAssignment.dueDate!),
        submissions: []
      };
      this.assignments.push(assignment);
      this.showAssignmentForm = false;
      this.newAssignment = {};
      this.generateAssessmentCalendar();
    }
  }

  viewExamDetails(exam: Exam): void {
    this.selectedExam = exam;
    this.currentView = 'details';
  }

  viewAssignmentDetails(assignment: Assignment): void {
    this.selectedAssignment = assignment;
    this.currentView = 'details';
  }

  deleteExam(id: number): void {
    this.exams = this.exams.filter(exam => exam.id !== id);
    this.generateAssessmentCalendar();
  }

  deleteAssignment(id: number): void {
    this.assignments = this.assignments.filter(assignment => assignment.id !== id);
    this.generateAssessmentCalendar();
  }

  generatePerformanceReport(): void {
    // This would be replaced with actual data analysis in a real implementation
    this.performanceReport = {
      classAverage: 78.5,
      highestScore: 98,
      lowestScore: 45,
      gradeDistribution: {
        A: 5,
        B: 12,
        C: 8,
        D: 3,
        F: 2
      },
      lowPerformers: ['Student X', 'Student Y']
    };
  }

  generateAssessmentCalendar(): void {
    this.assessmentCalendar = [
      ...this.exams.map(exam => ({
        type: 'Exam',
        title: exam.title,
        date: exam.date,
        details: `${exam.type} - ${exam.duration}`
      })),
      ...this.assignments.map(assignment => ({
        type: 'Assignment',
        title: assignment.title,
        date: assignment.dueDate,
        details: 'Due date'
      }))
    ].sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  calculateGrade(marks: number): string {
    const scheme = this.gradeSchemes.find(g => marks >= g.min && marks <= g.max);
    return scheme ? scheme.grade : 'N/A';
  }

  exportReport(format: 'pdf' | 'excel'): void {
    // In a real implementation, this would generate and download a file
    console.log(`Exporting report as ${format}`);
    alert(`Report exported as ${format.toUpperCase()}`);
  }
}