import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpForATourComponent } from './sign-up-for-a-tour.component';

describe('SignUpForATourComponent', () => {
  let component: SignUpForATourComponent;
  let fixture: ComponentFixture<SignUpForATourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpForATourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpForATourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
