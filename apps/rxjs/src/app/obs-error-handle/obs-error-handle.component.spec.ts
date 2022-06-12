import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsErrorHandleComponent } from './obs-error-handle.component';

describe('ObsErrorHandleComponent', () => {
  let component: ObsErrorHandleComponent;
  let fixture: ComponentFixture<ObsErrorHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsErrorHandleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsErrorHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
