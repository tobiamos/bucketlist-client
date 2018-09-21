import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
export class BucketlistDetailComponent implements OnInit, AfterViewInit {
  showForm = false;
  showEditForm = false;
  showElements = false;
  itemForm: FormGroup;
  editForm: FormGroup;
  items: any[];
  itemToEdit;

  constructor(
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.createForm();
    this.createForm2();
   }

  ngOnInit() {
    this.items = [];
    // this.getBucketLists();
  }
  handleDelete(itemId) {
    const res = window.confirm('Do you want to delete?');
    if (res) {
      this.deleteItem(this.getIdFromUrl(), itemId);
    }
  }
  handleShowForm() {
    return this.showForm = true;
  }
  hideForm() {
    return this.showForm = false;
  }
  handleShowEditForm(item) {
    this.itemToEdit = item;
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
  getIdFromUrl() {
    return this.activeRoute.snapshot.params['id'];
  }
  ngAfterViewInit() {
    this.getBucketLists();
  }
  createForm() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  createForm2() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      done: ['', [Validators.required]]
    });
  }

  getBucketLists() {
    this.auth.getItems(this.getIdFromUrl()).subscribe(
      response => {
        this.items = response['data']['items'];
      },
      error => {
        console.error(error);
      }
      );
  }
  onSubmit() {
    const data = this.itemForm.value;
    data['done'] = false;
    this.itemForm.reset();
    this.auth.createItem(data, this.getIdFromUrl()).subscribe(
      res => {
        this.getBucketLists();
      },
      error => {
        console.error(error);
      }
      );
  }
  editSubmit() {
    console.log(this.itemToEdit);
    const data = { name: this.itemToEdit['name'], done: this.itemToEdit['done']};
    this.auth.updateItem(this.getIdFromUrl(), this.itemToEdit['_id'], data)
    .subscribe(res => {
      this.itemToEdit = null;
      this.hideEditForm();
      this.getBucketLists();
      // console.log(res);
    }, error => {
      console.error(error);
    });
   }

  deleteItem(id, itemId) {
    this.auth.deleteItem(id, itemId).subscribe(res => {
      this.getBucketLists();
    }, error => {
      console.error(error);
    });
  }
  get name () { return this.editForm.get('name'); }
  get done () { return this.editForm.get('done'); }

}
