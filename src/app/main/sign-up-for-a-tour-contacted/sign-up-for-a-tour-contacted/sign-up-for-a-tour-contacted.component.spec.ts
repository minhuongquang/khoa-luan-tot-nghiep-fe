import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpForATourContactedComponent } from './sign-up-for-a-tour-contacted.component';

describe('SignUpForATourContactedComponent', () => {
  let component: SignUpForATourContactedComponent;
  let fixture: ComponentFixture<SignUpForATourContactedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpForATourContactedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpForATourContactedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
