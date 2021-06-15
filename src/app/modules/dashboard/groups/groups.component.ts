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

  groupList = [];
  flagMapping: number = 1;

  constructor(private router: Router, private formBuilder: FormBuilder, private toasterService: AppToasterService, private storageService: AppStorageService) { }

  ngOnInit(): void {
    this.groupList = this.storageService.getGroupDetails();
  }

  addGroup() {

  }

  changeGroupDetails(flag: number) {
    this.flagMapping = flag;
  }

}
