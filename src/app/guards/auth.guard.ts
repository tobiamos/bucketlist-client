import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public redirectUrl: string;
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if (!this.auth.loggedIn()) {
        return true;
      } else {
        this.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;
      }

  }
}
