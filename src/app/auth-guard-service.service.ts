import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardServiceService implements CanActivate {
  public isLoggedIn!: boolean;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private sharedService:SharedService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
   
    if (this.sharedService.getLogin() && (sessionStorage.getItem('role')== "Admin")) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }

    
  }
}
