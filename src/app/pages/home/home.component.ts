import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { GetData } from 'src/app/models/IGetDtata';
import { DpostService } from 'src/app/services/dpost.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private dpostService: DpostService, private loader: LoaderService, private ref: ChangeDetectorRef) { }
  showUpdatePost: boolean = false;
  buttonName = "update"
  childPageHeader = "Update user"

  // errormessage = new BehaviorSubject<string>('');
  // errormessage$ = this.errormessage.asObservable();

  user$ = this.dpostService.particularpost$.pipe(tap(res => {
    this.showUpdatePost = false
  }), 
  catchError((error: string) => {
    // this.errormessage.next(error);
    return EMPTY //caterror is observable method so return observable must
  })
  )

  ngOnInit(): void {
    this.loader.showLoader();
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }
  updatePost(data: any) {
    this.showUpdatePost = true
    this.dpostService.setData(data);
  }
  DeletePost(data: any) {   
    this.dpostService.setData(data);
    let idDelete=this.dpostService.sendData().id;
    let deleteDetails={
      ...data,id:idDelete
    }
    let userPermission = confirm("are you want to delete user...?");
    if (userPermission) {
      this.dpostService.deleteUser(deleteDetails);
    }
     location.reload();
  }
}
