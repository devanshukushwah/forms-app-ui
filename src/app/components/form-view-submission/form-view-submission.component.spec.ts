import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewSubmissionComponent } from './form-view-submission.component';

describe('FormViewSubmissionComponent', () => {
  let component: FormViewSubmissionComponent;
  let fixture: ComponentFixture<FormViewSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewSubmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormViewSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
