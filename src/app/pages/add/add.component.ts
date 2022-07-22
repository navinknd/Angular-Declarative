import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators, NgForm } from '@angular/forms';
import { tap } from 'rxjs';
import { DpostService } from 'src/app/services/dpost.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit {
  userForm!: FormGroup
  @Input() buttonName = '';
  @Input() childPageHeader = '';

  constructor(private fb: FormBuilder, private dpostService: DpostService, private ref: ChangeDetectorRef) { }

  userforUpdate$ = this.dpostService.particularpost$.pipe(tap(user => {
    if (user?.email === null) {
      user.email = "dummy1234@gmail.com"
    }
    this.userForm.patchValue({
      username: user?.username,
      email: user?.email,
      mobileNumber: user?.mobileNumber,
      password: "change if you want"
    })
  }))
  user$ = this.dpostService.particularpost$;

  ngOnInit(): void {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 10);
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      mobileNumber: [''],
      password: ['']
    })
  }
  UserSubmit() {
    let addDetails = {
      ...this.userForm.value
    }
    this.dpostService.addUser(addDetails);
    location.reload()
  }
  userUpdate() {
    let data = this.dpostService.sendData()
    let updateDetails = {
      ...this.userForm.value, id: data.id
    }
    this.dpostService.updateUser(updateDetails);
  }
}
