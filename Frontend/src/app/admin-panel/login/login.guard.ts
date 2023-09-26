import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

@Injectable({
    providedIn: 'root'
  })
class LoginGuard {
    constructor(private accountService: AccountService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let logged = this.accountService.isLoggedIn()
        console.log(logged);
        if(logged){
            return true
        }else{
            this.router.navigate(["ymadmin/login"])
            return false
        }
    }

}
export const canActivateFun: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(LoginGuard).canActivate(route, state)
}

