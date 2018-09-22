import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
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
export class BucketlistComponent implements OnInit, AfterViewInit {
  showForm = false;
  showEditForm = false;
  itemToEdit;
  query;
  bucketListForm: FormGroup;
  bucketList: any[];
  page;
  pages;
  count;
  errorMessage;
  infoMessage;
  hideMessage;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getBucketLists();
  }
  handleShowForm() {
    return this.showForm = true;
  }
  handleHideForm() {
    return this.showForm = false;
  }
  handleShowEditForm(item) {
    this.itemToEdit = item;
    return this.showEditForm = true;
  }
  hideEditForm() {
    return this.showEditForm = false;
  }
  createForm() {
    this.bucketListForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(1)]]
    });
  }
  onSubmit() {
    const data = this.bucketListForm.value;
    this.auth.createBucketList(data).subscribe(
      response => {
        const bucket = response['data']['bucket'];
        this.bucketList.push(bucket);
        this.bucketListForm.reset();
        this.count++;
        this.handleHideForm();
      },
      error => {
        console.error(error);
      });
  }
  delete(itemId) {
    const res = window.confirm('Do you want to delete?');
    if (res) {
      this.deleteItem(itemId);
    }
  }
  search() {
    console.log(this.query);
    this.auth.search(this.query).subscribe(res => {
      this.infoMessage = res['message'];
      this.bucketList = res['data']['bucketLists'];
      this.errorMessage = null;
      console.log(res);
    }, error => {
      if (error['status'] === 400 ) {
        console.log(this.query);
        this.errorMessage = null;
        return this.getBucketLists();
      }
      this.bucketList = [];
      this.errorMessage = error.error['message'] || 'search error';
      this.infoMessage = null;
      console.error(error['status']);
    });
  }
  deleteItem(id) {
    this.auth.deleteList(id).subscribe(res => {
      this.getBucketLists();
    }, error => { console.error(error); });
  }
  editSubmit() {
    const data = { name: this.itemToEdit['name'] };
    const id = this.itemToEdit['_id'];
    this.auth.updateList(id, data).subscribe(
      res => {
      this.itemToEdit = null;
      this.hideEditForm();
      this.getBucketLists();

    },
       error => {
         console.error(error);
       }
      );
  }
  getBucketLists() {
    this.auth.getBucketLists().subscribe(
      response => {
        this.bucketList = response['data']['bucketLists'];
        this.page = response['data']['page'];
        this.pages = response['data']['pages'];
        this.count = response['data']['count'];
        this.bucketList.sort((a, b) => a['items'].length > b['items'].lenth ? -1 : 1);
      },
      error => {
        console.error(error);
      }
      );

}
}
