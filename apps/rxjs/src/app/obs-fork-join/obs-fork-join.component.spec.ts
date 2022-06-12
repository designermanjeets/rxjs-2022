import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsForkJoinComponent } from './obs-fork-join.component';

describe('ObsForkJoinComponent', () => {
  let component: ObsForkJoinComponent;
  let fixture: ComponentFixture<ObsForkJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsForkJoinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsForkJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
