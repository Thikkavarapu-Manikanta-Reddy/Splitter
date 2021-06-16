import { Component, OnInit } from '@angular/core';
import { AppToasterService } from "../../../shared/services/app-toaster.service";
import { AppMessageService } from "src/app/shared/services/app-message.service";
import { AppStorageService } from "../../../shared/services/app-storage.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData: any;
  flagMapping: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private toasterService: AppToasterService, private appMessageService: AppMessageService, private storageService: AppStorageService) { }

  ngOnInit(): void {
    this.navigateToScreen(this.storageService.getDashboardScreenStatus());
    this.userData = this.storageService.getUserDetail();
  }

  navigateToScreen(flag) {
    this.flagMapping = flag == null ? 'GR' : flag;
    this.storageService.setDashboardScreenStatus(this.flagMapping);

    if (this.flagMapping == 'GR') {
      this.router.navigate(['dashboard/groups']);
    }
    else if (this.flagMapping == 'AGR') {
      this.router.navigate(['dashboard/add-groups']);
    }
    else {
      this.router.navigate(['dashboard/friends']);
    }
  }

  onLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      confirmButtonColor: '#0e76a8',
      cancelButtonColor: '#0e76a8',
    }).then((result) => {
      if (result.isConfirmed) {
        this.storageService.clear();
        this.router.navigate(['home']);
      }
    });
  }

  goToHome() {
    this.navigateToScreen('GR');
  }

}
