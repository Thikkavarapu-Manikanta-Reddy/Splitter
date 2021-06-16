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
        }
      }
      console.log(this.createdGroups, this.owedGroups);
    }

  }

  addGroup() {
    this.storageService.setDashboardScreenStatus('AGR');
    this.router.navigate(['dashboard/add-groups']);
  }

  changeGroupDetails(flag: number) {
    this.flagMapping = flag;
  }

}
