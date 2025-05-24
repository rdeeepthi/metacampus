import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsMaterialsComponent } from './assignments-materials.component';

describe('AssignmentsMaterialsComponent', () => {
  let component: AssignmentsMaterialsComponent;
  let fixture: ComponentFixture<AssignmentsMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
