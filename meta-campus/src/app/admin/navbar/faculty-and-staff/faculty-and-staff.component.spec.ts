import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAndStaffComponent } from './faculty-and-staff.component';

describe('FacultyAndStaffComponent', () => {
  let component: FacultyAndStaffComponent;
  let fixture: ComponentFixture<FacultyAndStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyAndStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyAndStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
