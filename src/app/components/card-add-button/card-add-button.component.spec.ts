import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAddButtonComponent } from './card-add-button.component';

describe('CardAddButtonComponent', () => {
  let component: CardAddButtonComponent;
  let fixture: ComponentFixture<CardAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAddButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
