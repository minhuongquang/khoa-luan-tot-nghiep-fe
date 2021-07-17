import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPostAfterTheTourComponent } from './submit-post-after-the-tour.component';

describe('SubmitPostAfterTheTourComponent', () => {
  let component: SubmitPostAfterTheTourComponent;
  let fixture: ComponentFixture<SubmitPostAfterTheTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitPostAfterTheTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitPostAfterTheTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
