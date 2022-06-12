import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsExhaustComponent } from './obs-exhaust.component';

describe('ObsExhaustComponent', () => {
  let component: ObsExhaustComponent;
  let fixture: ComponentFixture<ObsExhaustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsExhaustComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsExhaustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
