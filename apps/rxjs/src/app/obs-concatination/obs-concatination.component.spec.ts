import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsConcatinationComponent } from './obs-concatination.component';

describe('ObsConcatinationComponent', () => {
  let component: ObsConcatinationComponent;
  let fixture: ComponentFixture<ObsConcatinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsConcatinationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsConcatinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
