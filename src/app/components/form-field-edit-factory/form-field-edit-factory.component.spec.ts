import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldEditFactoryComponent } from './form-field-edit-factory.component';

describe('FormFieldEditFactoryComponent', () => {
  let component: FormFieldEditFactoryComponent;
  let fixture: ComponentFixture<FormFieldEditFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldEditFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFieldEditFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
