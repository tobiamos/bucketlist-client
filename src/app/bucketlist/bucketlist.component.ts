import { Component, OnInit, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.css'],
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
export class BucketlistComponent implements OnInit {
  showForm = false;
  bucketListForm: FormGroup;
   bucketList = [
    {
      id: 1,
      name: 'BucketList1',
      items: [
      {
      id: 1,
      name: 'need to do X',
      date_created: '2015 - 08 - 12 11: 57: 23',
      date_modified: '2015 - 08 - 12 11: 57: 23',
      done: false,
      },
      ],
      date_created:  '2015-08-12; 11; : 57; : 23 ',
      date_modified: '2015 - 08 - 12; 11; : 57; : 23',
      created_by: '1113456'
      },
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }
  handleShowForm() {
    return this.showForm = true;
  }
  handleHideForm() {
    return this.showForm = false;
  }
  createForm() {
    this.bucketListForm = this.fb.group({
      name: [ '', [Validators.required]]
    });
  }
  onSubmit() {
    const data = this.bucketListForm.value;
    this.bucketList.push(data);
    this.bucketListForm.reset();
    this.handleHideForm();

  }
}
