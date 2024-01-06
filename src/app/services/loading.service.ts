import { Injectable } from '@angular/core';
import { NgxLoadingService } from 'ngx-loading';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get loading(): BehaviorSubject<boolean> {
    return this.loadingSubject;
  }

  showLoader(): void {
    this.loadingSubject.next(true);
  }

  hideLoader(): void {
    this.loadingSubject.next(false);
  }
}
