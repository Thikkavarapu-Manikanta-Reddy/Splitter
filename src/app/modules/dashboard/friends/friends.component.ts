import { Component, OnInit } from '@angular/core';
import { AppToasterService } from "../../../shared/services/app-toaster.service";
import { AppStorageService } from "../../../shared/services/app-storage.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Router } from '@angular/router';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friendsList = {};
  loggedFriendsList = [];
  FriendForm: FormGroup;
  userData: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private toasterService: AppToasterService, private storageService: AppStorageService) { }

  ngOnInit(): void {
    this.userData = this.storageService.getUserDetail();
    this.friendsList = this.storageService.getFriendsDetails();
    if (this.friendsList != null) {
      this.loggedFriendsList = this.friendsList[this.userData];
    }
    this.createform();
  }

  createform() {
    this.FriendForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let friendsData = {
      "name": this.FriendForm.value.username,
      "email": this.FriendForm.value.email,
      "amount": 0,
      "percentage": 0
    };

    if (this.friendsList == null) {
      this.friendsList = {};
      this.friendsList[this.userData] = [];
    }
    if (this.friendsList[this.userData] == undefined) {
      this.friendsList[this.userData] = [];
    }
    this.friendsList[this.userData].push(friendsData);

    this.storageService.setFriendsDetails(this.friendsList);
    // this.friendsList = this.storageService.getFriendsDetails();
    this.loggedFriendsList = this.friendsList[this.userData];

    this.FriendForm.patchValue({
      username: null,
      email: null
    });

  }

}
