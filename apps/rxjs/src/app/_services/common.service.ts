import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
}

export function componentDestroyed(component: OnDestroy) {
  const oldNgOnDestroy = component.ngOnDestroy;
  const destroyed$ = new ReplaySubject<void>(1);
  component.ngOnDestroy = () => {
    oldNgOnDestroy.apply(component);
    destroyed$.next(undefined);
    destroyed$.complete();
  };
  return destroyed$;
}

export function customHttpObservable(url:string) {
  return Observable.create((observer: any) => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {signal})
      .then((response: any) => {

        if (response.ok) {
          return response.json();
        }
        else {
          observer.error('Request failed with status code: ' + response.status);
        }
      })
      .then(body => {

        observer.next(body);

        observer.complete();

      })
      .catch(err => {

        observer.error(err);

      });

    return () => controller.abort()


  });
}
