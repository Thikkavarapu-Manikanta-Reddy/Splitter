import { Component, OnInit } from '@angular/core';
import { AppToasterService } from "../../../shared/services/app-toaster.service";
import { AppStorageService } from "../../../shared/services/app-storage.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-groups',
  templateUrl: './add-groups.component.html',
  styleUrls: ['./add-groups.component.scss']
})
export class AddGroupsComponent implements OnInit {

  friendsList = {};
  loggedFriendsList = [];
  addGroupsForm: FormGroup;
  userData: any;
  selectedFriends = [];
  modifiedSelectedFriends = [];
  flagMapping: number = -1;
  groupDetails = {};

  constructor(private router: Router, private formBuilder: FormBuilder, private toasterService: AppToasterService, private storageService: AppStorageService) { }

  ngOnInit(): void {
    this.userData = this.storageService.getUserDetail();
    this.friendsList = this.storageService.getFriendsDetails();
    this.groupDetails = this.storageService.getGroupDetails();
    if (this.friendsList != null) {
      this.loggedFriendsList = this.friendsList[this.userData.email];
    }
    this.createform();
    console.log(this.friendsList, this.groupDetails);
  }

  createform() {
    this.addGroupsForm = this.formBuilder.group({
      groupName: ['', [Validators.required]],
      expense: [null, [Validators.required]]
    });
  }

  changeSplitDetails(flag: number) {

    console.log(this.selectedFriends);
    if (this.addGroupsForm.value.expense == null) {
      this.toasterService.showError("Enter expense before splitting among friends !!");
      return;
    }
    if (this.selectedFriends.length == 0) {
      this.toasterService.showError("Select friends before splitting the expense among friends !!");
      return;
    }
    this.flagMapping = flag;
    this.calculateAmountSplitting();
  }

  resetFlagMapping() {
    if (this.selectedFriends.length == 0) {
      this.flagMapping = -1;
      this.modifiedSelectedFriends = [];
    }
    this.modifiedSelectedFriends = JSON.parse(JSON.stringify(this.selectedFriends));
    this.modifiedSelectedFriends.push(this.userData);
    this.calculateAmountSplitting();
  }

  calculateAmountSplitting() {
    if (this.flagMapping == 1) {
      for (let i = 0; i < this.modifiedSelectedFriends.length; i++) {
        this.modifiedSelectedFriends[i].amount = parseFloat((this.addGroupsForm.value.expense / this.modifiedSelectedFriends.length).toFixed(2));
      }
    }
    else if (this.flagMapping == 2) {
      for (let i = 0; i < this.modifiedSelectedFriends.length; i++) {
        if (this.modifiedSelectedFriends[i].percentage == 0) {
          this.modifiedSelectedFriends[i].amount = 0;
          this.modifiedSelectedFriends[i].percentage = 0;
        }
        else {
          this.modifiedSelectedFriends[i].amount = (this.modifiedSelectedFriends[i].percentage / 100) * this.addGroupsForm.value.expense;
        }
      }
    }
  }

  changeAmountByPercentage(event: any, friend) {
    console.log(event.target.value);
    if (event.target.value < 0) {
      friend.percentage = 0;
      friend.amount = 0;
    }
    else
      friend.amount = (event.target.value / 100) * this.addGroupsForm.value.expense;
  }

  onSubmit() {

    let proceed = 1, percentageSum = 0, error = 1;

    if (this.flagMapping == 2) {
      for (let i = 0; i < this.modifiedSelectedFriends.length; i++) {
        if (this.modifiedSelectedFriends[i].percentage == 0 || this.modifiedSelectedFriends[i].percentage == null) {
          proceed = 0;
          error = 1;
          break;
        }
        else {
          percentageSum += this.modifiedSelectedFriends[i].percentage;
          if (i == this.modifiedSelectedFriends.length - 1 && percentageSum != 100) {
            proceed = 0;
            error = 2;
            break;
          }
        }
      }
    }

    if (proceed == 0) {
      if (error == 1) {
        this.toasterService.showError("Splitting the expense among all the selected friends is must !!");
      }
      else if (error == 2) {
        this.toasterService.showError("Overall percentage should equal to 100% !!");
      }
    }
    else {
      console.log("Proceed", this.modifiedSelectedFriends, this.addGroupsForm.value);

      let createdGroupFriendsArray = [], yourShare = 0;

      for (let i = 0; i < this.modifiedSelectedFriends.length; i++) {
        if (this.modifiedSelectedFriends[i].email != this.userData.email) {
          createdGroupFriendsArray.push(this.modifiedSelectedFriends[i]);
        }
        else {
          yourShare = this.modifiedSelectedFriends[i].amount;
        }
      }

      let groupData = {
        "createdGroups": {},
        "owedGroups": {}
      };

      groupData.createdGroups = {
        "groupName": this.addGroupsForm.value.groupName,
        "expense": this.addGroupsForm.value.expense,
        "yourShare": yourShare,
        "splitEqually": this.flagMapping == 1 ? true : false,
        "friends": createdGroupFriendsArray
      };

      if (this.groupDetails == null) {
        this.groupDetails = {};
        this.groupDetails[this.userData.email] = [];
      }
      if (this.groupDetails[this.userData.email] == undefined) {
        this.groupDetails[this.userData.email] = [];
      }

      let createGroupProceed = 1;

      if (this.groupDetails[this.userData.email].length > 0) {
        for (let i = 0; i < this.groupDetails[this.userData.email].length; i++) {
          if (this.groupDetails[this.userData.email][i].createdGroups.groupName == this.addGroupsForm.value.groupName) {
            createGroupProceed = 0;
            break;
          }
        }
      }

      if (createGroupProceed == 1) {
        this.groupDetails[this.userData.email].push(groupData);
        for (let i = 0; i < this.modifiedSelectedFriends.length; i++) {
          if (this.modifiedSelectedFriends[i].email != this.userData.email) {
            let groupData = {
              "createdGroups": {},
              "owedGroups": {}
            };
            groupData.owedGroups = {
              "groupName": this.addGroupsForm.value.groupName,
              "expense": this.addGroupsForm.value.expense,
              "owedExpense": this.modifiedSelectedFriends[i].amount,
              "splitEqually": this.flagMapping == 1 ? true : false,
              "owedFriend": this.userData
            };
            if (this.groupDetails[this.modifiedSelectedFriends[i].email] == undefined) {
              this.groupDetails[this.modifiedSelectedFriends[i].email] = [];
            }
            this.groupDetails[this.modifiedSelectedFriends[i].email].push(groupData);
          }
        }
        console.log(this.groupDetails);

        this.storageService.setGroupDetails(this.groupDetails);

        this.storageService.setDashboardScreenStatus('GR');
        this.router.navigate(['dashboard/groups']);

      }
      else {
        this.toasterService.showError("This group already exists !!");
      }

    }

  }

}
