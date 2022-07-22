import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY } from 'rxjs';
import { DpostService } from 'src/app/services/dpost.service';
import { LoaderService } from 'src/app/services/loader.service';
import { delay, map, tap } from 'rxjs/operators'
@Component({
  selector: 'app-dpost',
  templateUrl: './dpost.component.html',
  styleUrls: ['./dpost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DpostComponent implements OnInit, OnDestroy {
  buttonName = "Add user"
  childPageHeader = "Add User"
  showUserDatails: boolean = false;
  // errormessage = new BehaviorSubject<string>('');
  // errormessage$ = this.errormessage.asObservable();

  userList$ = this.dpostService.allusersList$.pipe(tap(user => {
    user.map(user => {
      if (user.email === null || user.email == '') {
        user.email = "dummy1234@gmail.com"
      }
    })
    user[0]?.id && this.dpostService.setSubjectID((user[0]?.id))
  }));

  singleID$ = this.dpostService.particularpost$.pipe(tap(data => {}));

  vm$ = combineLatest([this.userList$, this.singleID$]).pipe(map(([users, selecteduser]) => {
    return { users, selecteduser }
  }))
  constructor(
    private dpostService: DpostService,
    private ref: ChangeDetectorRef,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.showLoader();
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);
  }
 
  getId(id: any) {
    this.showUserDatails = false;
    id && this.dpostService.setSubjectID(id);
  }
  addUser() {
    this.showUserDatails = true
  }
  ngOnDestroy(): void {

  }
}
