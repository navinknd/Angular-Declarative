import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpostComponent } from './dpost.component';

describe('DpostComponent', () => {
  let component: DpostComponent;
  let fixture: ComponentFixture<DpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
