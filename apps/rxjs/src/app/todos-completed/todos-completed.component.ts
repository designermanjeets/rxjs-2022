import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'todos-completed',
  templateUrl: './todos-completed.component.html',
  styleUrls: ['./todos-completed.component.scss'],
})
export class TodosCompletedComponent implements OnInit {

  @Input() todos: any;

  constructor() {}

  ngOnInit(): void {}
}
