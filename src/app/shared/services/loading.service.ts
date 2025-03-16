import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /* isLoading = new Subject<boolean>();
  constructor() { }
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false) ;
  } */

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
