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
    if (this.friendsList != null && this.friendsList[this.userData.email] != undefined) {
      this.loggedFriendsList = this.friendsList[this.userData.email];
    }
    this.createform();
  }

  createform() {
    this.FriendForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  onSubmit() {

    if (this.FriendForm.value.email == this.userData.email) {
      this.toasterService.showError("You can't assign your emailId to your friends !!");
    }
    else {

      let proceed = 1;
      for(let i=0;i<this.friendsList[this.userData.email].length;i++) {
        if(this.FriendForm.value.email == this.friendsList[this.userData.email][i].email) {
          proceed = 0;
          break;
        }
      }

      if(proceed == 1) {
        let friendsData = {
          "name": this.FriendForm.value.userName,
          "email": this.FriendForm.value.email,
          "amount": 0,
          "percentage": 0
        };
  
        if (this.friendsList == null) {
          this.friendsList = {};
          this.friendsList[this.userData.email] = [];
        }
        if (this.friendsList[this.userData.email] == undefined) {
          this.friendsList[this.userData.email] = [];
        }
        this.friendsList[this.userData.email].push(friendsData);
  
        this.storageService.setFriendsDetails(this.friendsList);
        // this.friendsList = this.storageService.getFriendsDetails();
        this.loggedFriendsList = this.friendsList[this.userData.email];
  
        this.FriendForm.patchValue({
          userName: null,
          email: null
        });
      }
      else {
        this.toasterService.showError("Already a friend with the same emailId is added to your friends list !!");
      }
    }

  }

}
