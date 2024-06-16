import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAIComponent } from './card-ai.component';

describe('CardAIComponent', () => {
  let component: CardAIComponent;
  let fixture: ComponentFixture<CardAIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAIComponent]
    });
    fixture = TestBed.createComponent(CardAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
