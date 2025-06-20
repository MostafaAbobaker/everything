import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpEmailComponent } from './otp-email.component';

describe('OtpEmailComponent', () => {
  let component: OtpEmailComponent;
  let fixture: ComponentFixture<OtpEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
