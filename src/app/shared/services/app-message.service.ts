import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  constructor() { }

  show(text) {
    Swal.fire(text);
  }

  showWarning(text: string, title?: string, allowOutsideClick: boolean = true, showConfirmButton: boolean = true) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      allowOutsideClick: allowOutsideClick,
      showConfirmButton: showConfirmButton
    })
  }

  showSuccess(text: string) {
    Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: true,
      timer: 1500
    })
  }

  showError(text: string, title?: string, allowOutsideClick: boolean = true, showConfirmButton: boolean = true) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      allowOutsideClick: allowOutsideClick,
      showConfirmButton: showConfirmButton
    })
  }

  showInfo(title: string, text?: string, timer?: number) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      showConfirmButton: true,
      timer: timer,
      confirmButtonColor: '#0e76a8',
      cancelButtonColor: '#0e76a8'
    })
  }
}