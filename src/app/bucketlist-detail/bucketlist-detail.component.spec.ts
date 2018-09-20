import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketlistDetailComponent } from './bucketlist-detail.component';

describe('BucketlistDetailComponent', () => {
  let component: BucketlistDetailComponent;
  let fixture: ComponentFixture<BucketlistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketlistDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketlistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
