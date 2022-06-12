import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'todos-pending',
  templateUrl: './todos-pending.component.html',
  styleUrls: ['./todos-pending.component.scss'],
})
export class TodosPendingComponent implements OnInit {

  @Input() todos: any;

  constructor() {}

  ngOnInit(): void {}
}
