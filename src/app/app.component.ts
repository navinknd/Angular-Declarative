import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showLoader$ = this.loader.loaderAction$;
  constructor(private loader: LoaderService, private ref: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 10);
  }
}
