import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  concat, concatMap,
  debounceTime,
  distinctUntilChanged,
  from,
  fromEvent,
  map, mergeMap,
  Observable,
  switchMap,
  take,
  tap
} from 'rxjs';
import { customHttpObservable } from '../_services/common.service';

@Component({
  selector: 'workspace-obs-switch',
  templateUrl: './obs-switch.component.html',
  styleUrls: ['./obs-switch.component.scss'],
})
export class ObsSwitchComponent implements OnInit, AfterViewInit {

  posts$! : Observable<any>;

  comments$!: Observable<any[]>;

  @ViewChild('searchInput', { static: false, read: ElementRef }) input!: ElementRef;

  constructor() {}

  ngOnInit(): void {

    // https://rxmarbles.com/#switchMap
    // https://rxjs.dev/api/operators/switchMap

  }

  ngAfterViewInit() {
    this.flatSearch();
  }

  flatSearch() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        concatMap(search => this.loadPosts(search))
      ).subscribe(console.log);
  }

  optimizedSearch() {

    const searchPosts$ =  fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadPosts(search))
      );

    const initialPosts$ = this.loadPosts();

    this.posts$ = concat(initialPosts$, searchPosts$);
  }

  loadPosts(search = ''): Observable<any> {
    return customHttpObservable(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((res: any) => res.slice(0, 10))
      );
  }

}
