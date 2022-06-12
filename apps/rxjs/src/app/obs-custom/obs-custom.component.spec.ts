import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsCustomComponent } from './obs-custom.component';

describe('ObsCustomComponent', () => {
  let component: ObsCustomComponent;
  let fixture: ComponentFixture<ObsCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsCustomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
