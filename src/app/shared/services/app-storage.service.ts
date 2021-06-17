import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor() { }

  clear() {
    window.localStorage.removeItem('userDetail');
    window.localStorage.removeItem('dashboardScreenStatus');
    window.localStorage.removeItem('friendsAmtMapping');
  }

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

  setGroupDetails(value: any) {
    window.localStorage.setItem('groupDetails', JSON.stringify(value));
  }

  getGroupDetails(): any {
    return JSON.parse(window.localStorage.getItem('groupDetails'));
  }

  setFriendsDetails(value: any) {
    window.localStorage.setItem('friendsDetails', JSON.stringify(value));
  }

  getFriendsDetails(): any {
    return JSON.parse(window.localStorage.getItem('friendsDetails'));
  }

  setFriendsAmtMapping(value: any) {
    window.localStorage.setItem('friendsAmtMapping', JSON.stringify(value));
  }

  getFriendsAmtMapping(): any {
    return JSON.parse(window.localStorage.getItem('friendsAmtMapping'));
  }

}
