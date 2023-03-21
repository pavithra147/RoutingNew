import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardServiceService implements CanActivate {
  public isLoggedIn!: boolean;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }

    
  }
}
