import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  concatMap,
  exhaustAll,
  exhaustMap,
  from,
  fromEvent,
  interval,
  map,
  merge,
  mergeMap,
  of,
  Subject,
  take, timer
} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Posts } from '../obs-concatination/obs-concatination.component';

@Component({
  selector: 'workspace-obs-exhaust',
  templateUrl: './obs-exhaust.component.html',
  styleUrls: ['./obs-exhaust.component.scss'],
})
export class ObsExhaustComponent implements OnInit {

  form!: FormGroup;
  post!: Posts;
  @ViewChild('saveButton', { static: false, read: ElementRef }) saveButton!: ElementRef;
  @ViewChild('searchInput', { static: false, read: ElementRef }) searchInput!: ElementRef;

  submit$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // Exhaust or exhaustAll only has one active subscription at a time
    // if the current stream hasn’t completed, this new inner observable is dropped.
    // this.exhaustMap();

    this.submit$.pipe(
      exhaustMap(() => this.saveChanges(this.form.value))
    ).subscribe()

  }

  start(event: any) {
    this.exhaust();
  }

  exhaust() {
    const projection$ = interval(500).pipe(take(6));
    const source$ = timer(0, 3000)
      .pipe(
        map((val) => projection$),
        take(4)
      );

    const result$ = source$.pipe(exhaustAll());
    result$.subscribe(console.log);
  }

  exhaustMap() {

    this.post = {
      id: 1,
      category: '',
      description: '',
      longDescription: ''
    };

    this.form = this.fb.group({
      description: ['description', Validators.required],
      category: ['category', Validators.required],
      releasedAt: [Date.now(), Validators.required],
      longDescription: ['longDescription', Validators.required]
    });

    // this.form.valueChanges.pipe(
    //   // filter( () => this.form.valid),
    //   mergeMap((changes) => this.saveChanges(changes))
    // )
    //   .subscribe();

  }

  saveChanges(changes: any) {
    return from(fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));

  }

  save(event:any) {
    this.submit$.next(true);
  }

  cancel() {

  }
}

