import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concat, concatMap, from, interval, map, merge, mergeMap, of, Subscription, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Posts } from '../obs-concatination/obs-concatination.component';
import { componentDestroyed } from '../_services/common.service';

@Component({
  selector: 'workspace-obs-merge-combination',
  templateUrl: './obs-merge-combination.component.html',
  styleUrls: ['./obs-merge-combination.component.scss'],
})
export class ObsMergeCombinationComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  post!: Posts;
  @ViewChild('saveButton', { static: true }) saveButton!: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput! : ElementRef;

  sub!: Subscription;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Flattens multiple Observables together by blending their values into one Observable.
    // Multiple Parallel HTTP Calls
    // this.mergeMap();
  }

  start(event: any) {
    this.merge();
  }

  merge() {
    const stream1$ = interval(1000);
    const stream2$ = stream1$.pipe(map(val => val * 10));
    const result$ = merge(stream1$, stream2$);
    result$
      .subscribe((val: any) => console.log(val));
  }

  mergeMap() {

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

    this.form.valueChanges.
    pipe(
      // filter( () => this.form.valid),
      mergeMap((changes) => this.saveChanges(changes))
    )
      .subscribe();

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

  save() {
  }

  cancel() {

  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
