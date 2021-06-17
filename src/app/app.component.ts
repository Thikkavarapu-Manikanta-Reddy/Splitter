import { Component } from '@angular/core';
import { AppToasterService } from "../app/shared/services/app-toaster.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'splitter';

  constructor(private toasterService: AppToasterService) { }

  ngOnInit() {
  }
}
