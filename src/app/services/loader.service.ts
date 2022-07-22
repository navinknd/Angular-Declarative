import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<boolean>();
  loaderAction$ = this.loaderSubject.asObservable();
  constructor() { }

  showLoader() {
    this.loaderSubject.next(true);  
  }
  hideLoader(){
    this.loaderSubject.next(false);
  }

}
