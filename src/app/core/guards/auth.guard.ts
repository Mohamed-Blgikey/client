import { AccountService } from 'src/app/account/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _Router:Router,private accountService:AccountService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.CurrentUserSource$.pipe(
      map(user=>{
        if (user) {
          return true
        }else{
          this._Router.navigate(['/account/login'],{queryParams:{returnUrl:state.url}});
          return false;
        }
      })
    )
  }

}
