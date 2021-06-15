import { Component, OnInit } from '@angular/core';
import { AppToasterService } from "../../../shared/services/app-toaster.service";
import { AppStorageService } from "../../../shared/services/app-storage.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private toasterService: AppToasterService, private storageService: AppStorageService) { }

  ngOnInit() {
    this.createform();
  }

  createform() {
    this.LoginForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.storageService.setUserDetail(this.LoginForm.value.username);
    this.router.navigate(['dashboard']);
  }

}
