import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppToasterService {

  constructor(private toaster: ToastrService) { }

  showError(message?: string, title?: string) {
    const options= { positionClass:'toast-top-center' };
    this.toaster.error(message, title, options);
  }

  showSuccess(message?: string, title?: string) {
    const options= { positionClass:'toast-top-center' };
    this.toaster.success(message, title, options);
  }

  showWarning(message?: string, title?: string) {
    const options= { positionClass:'toast-top-center' };
    this.toaster.warning(message, title, options);
  }

  showInfo(message?: string, title?: string) {
    const options= { positionClass:'toast-top-center' };
    this.toaster.info(message, title, options);
  }

  clear(toastId?: number) {
    this.toaster.clear(toastId);
  }

  remove(toastId: number) {
    this.toaster.remove(toastId);
  }
}