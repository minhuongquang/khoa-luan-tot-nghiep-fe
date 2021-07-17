import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationForLeadTheDelegationComponent } from './registration-for-lead-the-delegation.component';

describe('RegistrationForLeadTheDelegationComponent', () => {
  let component: RegistrationForLeadTheDelegationComponent;
  let fixture: ComponentFixture<RegistrationForLeadTheDelegationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationForLeadTheDelegationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationForLeadTheDelegationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
