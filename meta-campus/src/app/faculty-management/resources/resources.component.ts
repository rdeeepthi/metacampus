import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface StudentData {
  id: string;
  name: string;
  department: string;
}

interface ResourceSections {
  teaching: boolean;
  research: boolean;
  elearning: boolean;
  department: boolean;
  library: boolean;
  feedback: boolean;
  policy: boolean;
  forms: boolean;
}

@Component({
  imports:[CommonModule,RouterLink],
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  studentData: StudentData = {
    id: 'STU2023001', // This will be replaced with actual data from database
    name: 'John Doe', // This will be replaced with actual data from database
    department: 'Computer Science' // This will be replaced with actual data from database
  };

  sections: ResourceSections = {
    teaching: false,
    research: false,
    elearning: false,
    department: false,
    library: false,
    feedback: false,
    policy: false,
    forms: false
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize with first section open
    this.sections.teaching = true;
  }

  toggleSection(section: keyof ResourceSections): void {
    this.sections[section] = !this.sections[section];
  }
}