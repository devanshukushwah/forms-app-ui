import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldFactoryComponent } from './form-field-factory.component';

describe('FormFieldFactoryComponent', () => {
  let component: FormFieldFactoryComponent;
  let fixture: ComponentFixture<FormFieldFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFieldFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
