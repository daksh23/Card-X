import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDesignsComponent } from './all-designs.component';

describe('AllDesignsComponent', () => {
  let component: AllDesignsComponent;
  let fixture: ComponentFixture<AllDesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDesignsComponent]
    });
    fixture = TestBed.createComponent(AllDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
