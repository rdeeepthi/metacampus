import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsAndMaterialsComponent } from './assignments-and-materials.component';

describe('AssignmentsAndMaterialsComponent', () => {
  let component: AssignmentsAndMaterialsComponent;
  let fixture: ComponentFixture<AssignmentsAndMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsAndMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentsAndMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
