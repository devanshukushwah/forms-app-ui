import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldInputEditComponent } from './field-input-edit.component';

describe('FieldInputEditComponent', () => {
  let component: FieldInputEditComponent;
  let fixture: ComponentFixture<FieldInputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldInputEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldInputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
