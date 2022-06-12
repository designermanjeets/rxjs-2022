import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsSwitchComponent } from './obs-switch.component';

describe('ObsSwitchComponent', () => {
  let component: ObsSwitchComponent;
  let fixture: ComponentFixture<ObsSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
