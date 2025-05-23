import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports:[RouterLink],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  isMobileView = false;
  isHovered = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    if (this.isMobileView) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleDropdown(event: Event): void {
    if (this.isMobileView) {
      event.preventDefault();
      const parent = (event.currentTarget as HTMLElement).parentElement;
      if (parent) {
        parent.classList.toggle('active');
      }
    }
  }

  logout(): void {
    // Implement logout logic here
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }
}