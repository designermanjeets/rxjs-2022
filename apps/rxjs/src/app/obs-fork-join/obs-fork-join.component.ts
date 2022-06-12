import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  concat,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  fromEvent,
  map,
  Observable,
  switchMap
} from 'rxjs';
import { customHttpObservable } from '../_services/common.service';

@Component({
  selector: 'workspace-obs-fork-join',
  templateUrl: './obs-fork-join.component.html',
  styleUrls: ['./obs-fork-join.component.scss'],
})
export class ObsForkJoinComponent implements OnInit, AfterViewInit {

  postId = 1;

  posts! : any;

  comments!: any[];

  @ViewChild('searchInput', { static: false, read: ElementRef }) input!: ElementRef;

  constructor() {}

  ngOnInit(): void {

    // Wait for Observables to complete and then combine last values they emitted;
    // complete immediately if an empty array is passed.
    // https://rxjs.dev/api/index/function/forkJoin

  }

  ngAfterViewInit() {
    this.forkJoin();
  }

  forkJoin() {

    const initialPosts$ = this.loadPosts();
    const initialComments$ = this.loadComments();

    forkJoin([initialPosts$, initialComments$]).subscribe(([post, comments]) => {
      console.log(post);
      console.log(comments);
      this.posts = post;
      this.comments = comments;
    });

  }

  loadPosts(search = ''): Observable<any> {
    return customHttpObservable(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((res: any) => res.slice(0, 5))
      );
  }

  loadComments(search = ''): Observable<any> {
    return customHttpObservable(`https://jsonplaceholder.typicode.com/comments`)
      .pipe(
        map((res: any) => res.slice(0, 5))
      );
  }

}
