import { Component, OnInit } from '@angular/core';
import { AppToasterService } from "../../../shared/services/app-toaster.service";
import { AppStorageService } from "../../../shared/services/app-storage.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData:any;
  flagMapping: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private toasterService: AppToasterService, private storageService: AppStorageService) { }

  ngOnInit(): void {
    this.navigateToScreen(this.storageService.getDashboardScreenStatus());
    this.userData = this.storageService.getUserDetail();
  }

  navigateToScreen(flag) {
    this.flagMapping = flag;
    this.storageService.setDashboardScreenStatus(this.flagMapping);

    if (this.flagMapping == 'GR') {
      this.router.navigate(['dashboard/groups']);
    }
    else {
      this.router.navigate(['dashboard/friends']);
    }
  }

}
