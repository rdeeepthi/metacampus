import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyToolsComponent } from './faculty-tools.component';

describe('FacultyToolsComponent', () => {
  let component: FacultyToolsComponent;
  let fixture: ComponentFixture<FacultyToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
