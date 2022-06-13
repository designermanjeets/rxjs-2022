import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsWithLatestFromComponent } from './obs-with-latest-from.component';

describe('ObsWithLatestFromComponent', () => {
  let component: ObsWithLatestFromComponent;
  let fixture: ComponentFixture<ObsWithLatestFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsWithLatestFromComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsWithLatestFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
