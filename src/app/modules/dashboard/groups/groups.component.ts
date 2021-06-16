import { Component, OnInit } from '@angular/core';
import { AppToasterService } from "../../../shared/services/app-toaster.service";
import { AppStorageService } from "../../../shared/services/app-storage.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groupDetails = {};
  loggedGroupDetailsList = [];
  flagMapping: number = 1;
  userData: any;
  createdGroups = 0;
  owedGroups = 0;
  totalOwedAmtAcrossAllGrps = 0;

  owedUsersTotalExpense = {};

  constructor(private router: Router, private formBuilder: FormBuilder, private toasterService: AppToasterService, private storageService: AppStorageService) { }

  ngOnInit(): void {
    this.userData = this.storageService.getUserDetail();
    this.groupDetails = this.storageService.getGroupDetails();
    if (this.groupDetails != null && this.groupDetails[this.userData.email] != undefined) {
      this.loggedGroupDetailsList = this.groupDetails[this.userData.email];
    }
    console.log(this.groupDetails, this.loggedGroupDetailsList);

    if (this.loggedGroupDetailsList.length > 0) {
      for (let i = 0; i < this.loggedGroupDetailsList.length; i++) {
        if (Object.keys(this.loggedGroupDetailsList[i].createdGroups).length != 0) {
          this.createdGroups = 1;
        }
        if (Object.keys(this.loggedGroupDetailsList[i].owedGroups).length != 0) {
          this.owedGroups = 1;
          this.totalOwedAmtAcrossAllGrps += this.loggedGroupDetailsList[i].owedGroups.owedExpense;
        }
      }
      console.log(this.createdGroups, this.owedGroups);
    }
    this.calculateAmountOwedByYou();
  }

  calculateAmountOwedByYou() {

    let obj1 = {}, obj2 = {};

    if (this.loggedGroupDetailsList.length > 0) {
      for (let i = 0; i < this.loggedGroupDetailsList.length; i++) {
        if (Object.keys(this.loggedGroupDetailsList[i].createdGroups).length != 0) {
          for (let j = 0; j < this.loggedGroupDetailsList[i].createdGroups.friends.length; j++) {
            let data = this.loggedGroupDetailsList[i].createdGroups.friends[j];
            if (obj1[data.name] == undefined) {
              obj1[data.name] = 0;
            }
            obj1[data.name] += data.amount;
          }
        }
      }

      console.log(obj1);

      for (let i = 0; i < this.loggedGroupDetailsList.length; i++) {
        if (Object.keys(this.loggedGroupDetailsList[i].owedGroups).length != 0) {
          let data = this.loggedGroupDetailsList[i].owedGroups;
          if (obj2[data.owedFriend.name] == undefined) {
            obj2[data.owedFriend.name] = 0;
          }
          obj2[data.owedFriend.name] += data.owedExpense;
        }
      }

      console.log(obj2);
    }

    let newObj = {};

    for (let key in obj2) {
      console.log(key, ":", obj2[key]);

      if (obj1[key] > obj2[key]) {
        newObj[key] = {
          "youOwe": key,
          "oweYou": "you (" + this.userData.name + " )",
          "finalAmount": parseFloat((Math.abs(obj1[key] - obj2[key])).toFixed(2)),
          "sign": "positive"
        }
      }
      else {
        newObj["you (" + this.userData.name + "-" + key + " )"] = {
          "youOwe": "you (" + this.userData.name + " )",
          "oweYou": key,
          "finalAmount": (Object.keys(obj1).length == 0 || obj1[key] == undefined) ? obj2[key] : parseFloat((Math.abs(obj1[key] - obj2[key])).toFixed(2)),
          "sign": "negative"
        }
      }
    }

    this.owedUsersTotalExpense = newObj;
    console.log(this.owedUsersTotalExpense);
  }

  addGroup() {
    this.storageService.setDashboardScreenStatus('AGR');
    this.router.navigate(['dashboard/add-groups']);
  }

  changeGroupDetails(flag: number) {
    this.flagMapping = flag;
  }

  openAmountModal() {
    $('#myAmtModal').modal({
      show: true
    });
  }

}
