import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FacultyData {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
}

interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
}

@Component({
  selector: 'app-faculty-tools',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty-tools.component.html',
  styleUrls: ['./faculty-tools.component.scss']
})
export class FacultyToolsComponent implements OnInit {
  facultyData: FacultyData = {
    id: 'FAC2023001',
    name: 'Dr. Jane Smith',
    email: 'j.smith@university.edu',
    department: 'Computer Science',
    position: 'Associate Professor'
  };

  currentSemester = 'Fall 2023';
  activeTool: string | null = null;
  
  facultyCourses: Course[] = [
    { id: 'CS101', code: 'CS101', name: 'Introduction to Programming', semester: 'Fall 2023' },
    { id: 'CS301', code: 'CS301', name: 'Data Structures', semester: 'Fall 2023' },
    { id: 'CS401', code: 'CS401', name: 'Algorithms', semester: 'Fall 2023' }
  ];

  selectedCourse: string = this.facultyCourses[0].id;
  selectedGradeCourse: string = this.facultyCourses[0].id;
  selectedAnalyticsCourse: string = this.facultyCourses[0].id;
  attendanceDate: string = new Date().toISOString().split('T')[0];

  constructor() { }

  ngOnInit(): void {
    // Initialize with no active tool
    this.activeTool = null;
  }

  setActiveTool(tool: string): void {
    this.activeTool = this.activeTool === tool ? null : tool;
  }

  getActiveToolTitle(): string {
    const toolTitles: { [key: string]: string } = {
      courseMaterial: 'Course Material Management',
      lessonPlan: 'Lesson Plan Builder',
      attendance: 'Attendance Tracker',
      gradebook: 'Gradebook',
      timetable: 'Class Timetable Viewer',
      downloads: 'Download Center',
      feedback: 'Feedback & Survey Tools',
      documents: 'Document Generator',
      analytics: 'Analytics Tools',
      substitute: 'Substitute Management'
    };
    return toolTitles[this.activeTool!] || '';
  }

  openUploadDialog(): void {
    // This would be implemented with actual file upload logic
    console.log('Opening file upload dialog');
  }
}