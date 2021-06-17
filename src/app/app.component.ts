import { Component } from '@angular/core';
import { AppToasterService } from "../app/shared/services/app-toaster.service";
import { AppStorageService } from "../app/shared/services/app-storage.service";
import { AppMessageService } from '../app/shared/services/app-message.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'splitter';
  today = new Date();
  lastDayOfMonth;

  userData: any;
  owedUsersTotalExpense = {};

  constructor(private toasterService: AppToasterService, private appMessageService: AppMessageService, private storageService: AppStorageService) { }

  ngOnInit() {

    this.userData = this.storageService.getUserDetail();

    if (this.userData != null) {
      this.owedUsersTotalExpense = this.storageService.getFriendsAmtMapping();
      console.log(this.owedUsersTotalExpense);

      this.lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
      console.log(this.lastDayOfMonth, this.lastDayOfMonth.getDate(), this.today.getDate());

      if (this.lastDayOfMonth.getDate() == this.today.getDate()) {
        this.showReminder();
      }
    }

  }

  showReminder() {
    $('#myAmtReminderModal').modal({
      show: true
    });
  }

}
