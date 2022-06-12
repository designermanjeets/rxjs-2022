import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosPendingComponent } from './todos-pending.component';

describe('TodosPendingComponent', () => {
  let component: TodosPendingComponent;
  let fixture: ComponentFixture<TodosPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosPendingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
