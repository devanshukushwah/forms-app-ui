import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelExternalLinkComponent } from './label-external-link.component';

describe('LabelExternalLinkComponent', () => {
  let component: LabelExternalLinkComponent;
  let fixture: ComponentFixture<LabelExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelExternalLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelExternalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
