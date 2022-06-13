import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, debounceTime, delay, fromEvent, map, Observable, of, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'rxjs';

  todosComplete$!: Observable<any>;
  todosPending$!: Observable<any>;

  public links = [
    { text: 'Map/Filter/Reduce/Tap', link: 'operators' },
    { text: 'Concatenation', link: 'concat' },
    { text: 'Merge Strategy', link: 'merge' },
    { text: 'Exhaust/ExhaustAll', link: 'exhaust' },
    { text: 'Switch/Map', link: 'switch' },
    { text: 'forkJoin', link: 'forkjoin' },
    { text: 'withLatestFrom', link: 'withlatestfrom' },
    { text: 'Error Handling', link: 'error' },
    { text: 'Custom Operator', link: 'custom' },
  ];

  constructor(
    private _http: HttpClient
  ) {
  }

  ngOnInit() {
    // RxJS stands for Reactive Extensions for JavaScript
    // this.stream(); // A stream refers to values of data overtime.
    // this.problem();
    // this.solution();
    // this.errorAndComplete();
    // this.imperativeApproach();
    // this.reactiveApproach();
  }

  stream() {
    document.addEventListener('click', (val) => {
      console.log('Clicked ' + val);
    });

    let counter = 0;
    setInterval(() => {
      console.log('Counter => ' + counter);
      counter++;
    }, 1000);

    setTimeout(() => {
      console.log('Finished!');
    }, 3000);
  }

  problem() {
    document.addEventListener('click', (val) => {
      console.log('Clicked ' + val);

      setTimeout(() => {
        console.log('Finished!');

        let counter = 0;
        setInterval(() => {
          console.log('Counter => ' + counter);
          counter++;
        }, 1000);
      }, 3000);
    });
  }

  solution() {
    const click$ = fromEvent(document, 'click');
    const interval$ = timer(3000, 1000);

    click$
      .pipe(
        tap(() => console.log('Clicked!')),
        switchMap((value, n) => interval$)
      )
      .subscribe((val: any) => {
        console.log('Counter ==> ' + val);
      });
  }

  errorAndComplete() {
    of(1, 2, 3, 4, 5)
      // .pipe(
      //   // map((n) => {
      //   //   if (n === 4) {
      //   //     throw 'Error Four!';
      //   //   }
      //   //   return n;
      //   // })
      //   // retry(2) // retry 2 times on error
      // )
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.log('Complete'),
      });
  }

  imperativeApproach() {
    let todosComplete: any[]; // this could be a global/Input variable for other comp
    let todosPending: any[]; // this could be a global/Input variable for other comp

    const todos$ = this._http
      .get('https://jsonplaceholder.typicode.com/todos')
      .pipe(map((val: any) => val.slice(0, 20)));

    todos$.subscribe((val: any) => {
      todosComplete = val.filter((todo: any) => todo.completed);
      todosPending = val.filter((todo: any) => !todo.completed);
      console.log(todosComplete);
      console.log(todosPending);
      // Can be a Callback Hell if nested for multiple use cases
    });
  }

  reactiveApproach() {
    const todos$ = this._http
      .get('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        map((val: any) => val.slice(0, 10))
        // shareReplay()
      );

    this.todosComplete$ = todos$.pipe(
      map((val: any) => val.filter((todo: any) => todo.completed))
    );
    this.todosPending$ = todos$.pipe(
      map((val: any) => val.filter((todo: any) => !todo.completed))
    );
  }

  showInfo(link: any) {

  }


}
