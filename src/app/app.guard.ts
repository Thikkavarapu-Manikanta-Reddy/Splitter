import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { AppStorageService } from 'src/app/shared/services/app-storage.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {
    constructor(private storage: AppStorageService, private router: Router, private messageService: AppMessageService) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const userDetail = this.storage.getUserDetail();
        if (userDetail && userDetail.email) {
            return true;
        } else {
            this.messageService.showInfo('Session out!', null, 1500);
            this.router.navigate(['home']);
        }
        return false;
    }

}
