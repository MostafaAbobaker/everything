import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpMobileComponent } from './otp-mobile.component';

describe('OtpMobileComponent', () => {
  let component: OtpMobileComponent;
  let fixture: ComponentFixture<OtpMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
