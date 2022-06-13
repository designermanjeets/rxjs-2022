import { Component, OnInit } from '@angular/core';
import { filter, map, reduce, tap, range } from 'rxjs';

@Component({
  selector: 'workspace-obs-operators',
  templateUrl: './obs-operators.component.html',
  styleUrls: ['./obs-operators.component.scss'],
})
export class ObsOperatorsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // https://rxjs.dev/api/operators/map
    // https://rxjs.dev/api/operators/filter
    // https://rxjs.dev/api/operators/reduce
    // https://rxjs.dev/api/operators/tap
  }

  start(event: any) {
    range(1, 10)
      .pipe(
        map(item => item * 10),
        filter(item => item % 20 === 0),
        reduce((accumulator, item) => accumulator + item),
        tap(sum => console.log(sum))
      )
      .subscribe();
  }
}
