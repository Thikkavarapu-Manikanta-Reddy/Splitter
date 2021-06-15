import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor() { }

  setUserDetail(value: any) {
    window.localStorage.setItem('userDetail', JSON.stringify(value));
  }

  getUserDetail(): any {
    return JSON.parse(window.localStorage.getItem('userDetail'));
  }

  getDashboardScreenStatus() {
    return JSON.parse(window.localStorage.getItem('dashboardScreenStatus'));
  }

  setDashboardScreenStatus(value: any) {
    window.localStorage.setItem('dashboardScreenStatus', JSON.stringify(value));
  }

}
