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
  flagMapping: number = -1;

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
    }
    this.calculateAmountSplitting();
  }

  calculateAmountSplitting() {
    if (this.flagMapping == 1) {
      for (let i = 0; i < this.selectedFriends.length; i++) {
        this.selectedFriends[i].amount = parseFloat((this.addGroupsForm.value.expense / this.selectedFriends.length).toFixed(2));
      }
    }
    else if (this.flagMapping == 2) {
      for (let i = 0; i < this.selectedFriends.length; i++) {
        if (this.selectedFriends[i].percentage == 0) {
          this.selectedFriends[i].amount = 0;
          this.selectedFriends[i].percentage = 0;
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
      for (let i = 0; i < this.selectedFriends.length; i++) {
        if (this.selectedFriends[i].percentage == 0) {
          proceed = 0;
          error = 1;
          break;
        }
        else {
          percentageSum += this.selectedFriends[i].percentage;
          if (i == this.selectedFriends.length - 1 && percentageSum != 100) {
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
      console.log("Proceed", this.selectedFriends, this.addGroupsForm.value);
    }

  }

}
