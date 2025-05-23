import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  date: Date;
  read: boolean;
  attachments?: string[];
}

interface Announcement {
  id: number;
  title: string;
  description: string;
  course?: string;
  validUntil: Date;
  attachment?: string;
  scheduled?: Date;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone?: string;
  course?: string;
}

interface Feedback {
  id: number;
  course: string;
  rating: number;
  comments: string;
  anonymous: boolean;
  date: Date;
}

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
  activeTab: string = 'messages';
  newMessage: Message = {
    id: 0,
    sender: 'Faculty Name',
    recipient: '',
    subject: '',
    content: '',
    date: new Date(),
    read: false
  };
  messages: Message[] = [];
  announcements: Announcement[] = [];
  contacts: Contact[] = [];
  feedbacks: Feedback[] = [];
  selectedCourseFilter: string = 'all';
  isComposing: boolean = false;
  isCreatingAnnouncement: boolean = false;
  newAnnouncement: Announcement = {
    id: 0,
    title: '',
    description: '',
    validUntil: new Date(new Date().setDate(new Date().getDate() + 7))
  };

  ngOnInit(): void {
    // Initialize with sample data - will be replaced with API calls
    this.messages = [
      {
        id: 1,
        sender: 'Admin Office',
        recipient: 'Faculty Name',
        subject: 'Meeting Reminder',
        content: 'Don\'t forget about the faculty meeting tomorrow at 10 AM.',
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        read: false
      },
      {
        id: 2,
        sender: 'Student A',
        recipient: 'Faculty Name',
        subject: 'Question about assignment',
        content: 'I have a question about the requirements for the upcoming project.',
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        read: true,
        attachments: ['assignment_guidelines.pdf']
      }
    ];

    this.announcements = [
      {
        id: 1,
        title: 'Exam Schedule Update',
        description: 'The final exam schedule has been updated. Please check the new dates.',
        course: 'CS101',
        validUntil: new Date(new Date().setDate(new Date().getDate() + 14)),
        attachment: 'exam_schedule.pdf'
      }
    ];

    this.contacts = [
      {
        id: 1,
        name: 'Student A',
        role: 'Student',
        email: 'student.a@college.edu',
        phone: '555-0101',
        course: 'CS101'
      },
      {
        id: 2,
        name: 'Prof. Smith',
        role: 'Faculty - Computer Science',
        email: 'smith@college.edu',
        phone: '555-0202'
      }
    ];

    this.feedbacks = [
      {
        id: 1,
        course: 'CS101',
        rating: 4,
        comments: 'The lectures were very informative but sometimes too fast.',
        anonymous: true,
        date: new Date(new Date().setDate(new Date().getDate() - 7))
      }
    ];
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  sendMessage(): void {
    this.newMessage.id = this.messages.length + 1;
    this.newMessage.date = new Date();
    this.messages.unshift({...this.newMessage});
    this.isComposing = false;
    this.resetMessageForm();
  }

  resetMessageForm(): void {
    this.newMessage = {
      id: 0,
      sender: 'Faculty Name',
      recipient: '',
      subject: '',
      content: '',
      date: new Date(),
      read: false
    };
  }

  createAnnouncement(): void {
    this.newAnnouncement.id = this.announcements.length + 1;
    this.announcements.unshift({...this.newAnnouncement});
    this.isCreatingAnnouncement = false;
    this.resetAnnouncementForm();
  }

  resetAnnouncementForm(): void {
    this.newAnnouncement = {
      id: 0,
      title: '',
      description: '',
      validUntil: new Date(new Date().setDate(new Date().getDate() + 7))
    };
  }

  markAsRead(message: Message): void {
    message.read = true;
  }

  deleteMessage(id: number): void {
    this.messages = this.messages.filter(msg => msg.id !== id);
  }

  deleteAnnouncement(id: number): void {
    this.announcements = this.announcements.filter(ann => ann.id !== id);
  }

  get filteredMessages(): Message[] {
    if (this.selectedCourseFilter === 'all') {
      return this.messages;
    }
    // In a real app, we would filter by course
    return this.messages;
  }

  get filteredContacts(): Contact[] {
    if (this.selectedCourseFilter === 'all') {
      return this.contacts;
    }
    return this.contacts.filter(contact => contact.course === this.selectedCourseFilter);
  }
}