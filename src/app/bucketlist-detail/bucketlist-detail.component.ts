import { Component, OnInit, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-bucketlist-detail',
  templateUrl: './bucketlist-detail.component.html',
  styleUrls: ['./bucketlist-detail.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class BucketlistDetailComponent implements OnInit {
  showForm = false;
  showEditForm = false;
  showElements = false;

  constructor() { }

  ngOnInit() {
  }
  handleDelete() {
    window.confirm('Do you want to delete?');
  }
  handleShowForm() {
    return this.showForm = true;
  }
  hideForm() {
    return this.showForm = false;
  }
  handleShowEditForm() {
    return this.showEditForm = true;
  }
  hideEditForm() {
    return this.showEditForm = false;
  }
  handleShowElements() {
    return this.showElements = true;
  }
  hideElements () {
    return this.showElements = false;
  }

}
