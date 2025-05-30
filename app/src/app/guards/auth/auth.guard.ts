import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean {
    if (this.accountService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/authentication/landing']);
      return false;
    }
  }
}
