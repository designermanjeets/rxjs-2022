import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsMergeCombinationComponent } from './obs-merge-combination.component';

describe('ObsMergeCombinationComponent', () => {
  let component: ObsMergeCombinationComponent;
  let fixture: ComponentFixture<ObsMergeCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsMergeCombinationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsMergeCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
