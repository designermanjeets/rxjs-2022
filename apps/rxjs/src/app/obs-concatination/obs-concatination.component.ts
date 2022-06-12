import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { concat, concatMap, delay, filter, from, interval, map, of, timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Posts {
  id:number;
  description:string;
  longDescription: string;
  category:string;
}

@Component({
  selector: 'workspace-obs-concatination',
  templateUrl: './obs-concatination.component.html',
  styleUrls: ['./obs-concatination.component.scss'],
})
export class ObsConcatinationComponent implements OnInit {

  form!: FormGroup;
  post!: Posts;
  @ViewChild('saveButton', { static: true }) saveButton!: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput! : ElementRef;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    // Flattens/Combines all of the given Observables but in a serialized fashion, in sequence
    // Use this operator if the order of emissions is important

    // https://www.learnrxjs.io/learn-rxjs/operators/combination/concat
    // https://rxjs.dev/api/operators/concatAll

    // this.concatMap();

  }

  init() {
    const sub = concat(
      // interval(1000), // Never completes hence other streams won't be printed
      of(1, 2, 3),
      // subscribed after first completes
      of(4, 5, 6),
      // subscribed after second completes
      of(7, 8, 9)
    )

    sub.subscribe(val => {
      console.log(val);
    })

  }

  start(event: any) {
    this.init();
  }

  concatProblem() {
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

    this.form.valueChanges
      .subscribe(changes => {
        const saveData$ =
        from(fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
          method: 'PUT',
          body: JSON.stringify(changes),
          headers: {
            'content-type': 'application/json'
          }
        }));

        saveData$.subscribe(val => console.log(val));

    });

  }

  concatMap() {

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
        concatMap( (changes) => this.saveChanges(changes))
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

}
