import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetData } from 'src/app/models/IGetDtata';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnDestroy {
  userDataList: GetData[] = [];
  getUserAPi!: Subscription;

  constructor(
    private postService: PostService,
    private loader: LoaderService
    // private ref:ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loader.showLoader();
    this.getUserAPi = this.postService.getAllUserData().subscribe({
      next: (res) => {
        this.loader.hideLoader();
        res.map(data => {
          if (data.email === null || data.email == '') {
            data.email = "dummy1234@gmail.com"
          }
        })
        this.userDataList = res;
        // this.ref.detectChanges();
        console.log(this.userDataList);
      }, error: (err) => {
        console.log({ err });
      }, complete: () => {
        console.log("user list api completed!");
      }
    });
  }
  ngOnDestroy(): void {
    this.getUserAPi && this.getUserAPi.unsubscribe();
  }
}
