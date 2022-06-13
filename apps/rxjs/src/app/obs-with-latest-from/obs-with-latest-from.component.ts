import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  concat,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  fromEvent,
  map,
  Observable,
  switchMap, toArray, withLatestFrom
} from 'rxjs';
import { customHttpObservable } from '../_services/common.service';

@Component({
  selector: 'workspace-obs-with-latest-from',
  templateUrl: './obs-with-latest-from.component.html',
  styleUrls: ['./obs-with-latest-from.component.scss'],
})
export class ObsWithLatestFromComponent implements OnInit, AfterViewInit {

  posts! : any;

  comments!: any[];

  @ViewChild('searchInput', { static: false, read: ElementRef }) input!: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Whenever the source Observable emits a value,
    // it computes a formula using that value plus the latest values from other input Observables
    // https://rxjs.dev/api/operators/withLatestFrom
    this.withLatestFrom();

  }

  ngAfterViewInit() {
    //
  }

  withLatestFrom() {

    const initialPosts$ = this.loadPosts();
    const initialComments$ = this.loadComments();

    initialComments$
      .pipe(
        withLatestFrom(initialPosts$)
      )
      .subscribe(([post, comments]) => {
      console.log(post);
      console.log(comments);
      this.posts = post;
      this.comments = comments;
      this.cdRef.detectChanges();
    });

  }

  loadPosts(search = ''): Observable<any> {
    return customHttpObservable(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((res: any) => res.slice(0, 5))
      );
  }

  loadComments(search = ''): Observable<any> {
    return customHttpObservable(`https://jsonplaceholder.typicode.com/posts/1`)
      .pipe(
        map((res: any) => res),
        toArray()
      );
  }

}
