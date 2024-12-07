import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalModelComponent } from './paypal-model.component';

describe('PaypalModelComponent', () => {
  let component: PaypalModelComponent;
  let fixture: ComponentFixture<PaypalModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaypalModelComponent]
    });
    fixture = TestBed.createComponent(PaypalModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
