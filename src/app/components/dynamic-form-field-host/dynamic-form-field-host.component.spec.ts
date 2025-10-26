import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormFieldHostComponent } from './dynamic-form-field-host.component';

describe('DynamicFormFieldHostComponent', () => {
  let component: DynamicFormFieldHostComponent;
  let fixture: ComponentFixture<DynamicFormFieldHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormFieldHostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormFieldHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
