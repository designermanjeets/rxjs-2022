import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  catchError,
  concat,
  debounceTime, delayWhen,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  of, retryWhen, shareReplay,
  switchMap, take, tap, timer
} from 'rxjs';
import { customHttpObservable } from '../_services/common.service';
import { debug, RxJsLoggingLevel } from '../_services/debug.service';

@Component({
  selector: 'workspace-obs-error-handle',
  templateUrl: './obs-error-handle.component.html',
  styleUrls: ['./obs-error-handle.component.scss'],
})
export class ObsErrorHandleComponent implements OnInit, AfterViewInit {

  postId = 1;

  posts$! : Observable<any>;

  comments$!: Observable<any[]>;

  @ViewChild('searchInput', { static: false, read: ElementRef }) input!: ElementRef;

  constructor() {}

  ngOnInit(): void {

    // https://rxmarbles.com/#switchMap
    // https://rxjs.dev/api/operators/switchMap

  }

  ngAfterViewInit() {
    this.optimizedSearch();
  }

  errorHandle() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => {
          event.target.value;
          if (event.target.value.length === 4) {
            throw event.target.value;
          }
          return event.target.value;
        }),
        retryWhen((errors) =>
          errors.pipe(
            // log error message
            tap(value => console.log(`Value ${ value } was too high!`)),
            // restart in 5 seconds
            delayWhen(value => timer(2000)),
            take(2)
          )
        ),
      )
      .subscribe({
        next: x => console.log(x),
        error: err => console.log(err)
      });
  }

  optimizedSearch() {

    const searchPosts$ =  fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadPosts(search)),
      );

    const initialPosts$ = this.loadPosts();

    this.posts$ = concat(initialPosts$, searchPosts$).pipe(
      retryWhen((errors) =>
        errors.pipe(
          // log error message
          tap(value => console.log(`Value ${ value } was too high!`)),
          // restart in 5 seconds
          delayWhen(value => timer(2000)),
          take(2)
        )
      ),
    );
  }

  loadPosts(search = ''): Observable<any> {
    return customHttpObservable(`https://jsonplaceholder.typicode.comz/posts`)
      .pipe(
        map((res: any) => res.slice(0, 3))
      );
  }

}
