import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckinGuideComponent } from './form-checkin-guide.component';

describe('FormCheckinGuideComponent', () => {
  let component: FormCheckinGuideComponent;
  let fixture: ComponentFixture<FormCheckinGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCheckinGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckinGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
