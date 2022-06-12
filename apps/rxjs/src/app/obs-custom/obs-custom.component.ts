import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, delayWhen, interval, map, of, range, retryWhen, take, timer } from 'rxjs';
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from '../_services/debug.service';

@Component({
  selector: 'workspace-obs-custom',
  templateUrl: './obs-custom.component.html',
  styleUrls: ['./obs-custom.component.scss'],
})
export class ObsCustomComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  debug() {

    setRxJsLoggingLevel(RxJsLoggingLevel.ERROR);

    range(1,10)
      .pipe(
        map(n => {
          if (n === 4) {
            throw 'four!';
          }
          return n;
        }),
        catchError(err => {
          throw 'error in source. Details: ' + err;
        }),
        debug(RxJsLoggingLevel.DEBUG, `Custom RxJsLoggingLevel.DEBUG`),
        retryWhen((errors) =>
          errors.pipe(
            // log error message
            debug(RxJsLoggingLevel.ERROR, `Custom RxJsLoggingLevel.ERROR`),
            delayWhen(value => timer(value * 3000)),
            take(1)
          )
        ),
      )
      .subscribe({
        next: x => console.log(x),
        error: err => console.log(err)
      });
    // 1, 2, 3, error in source. Details: four!
  }
}
