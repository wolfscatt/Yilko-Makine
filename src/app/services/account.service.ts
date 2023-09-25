import { Injectable } from '@angular/core';
import { User } from '../admin-panel/login/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private router: Router) { }
  loggedIn = false

  login(user:User): boolean{
    if(user.userName=="yilko" && user.password=="12345"){
      this.loggedIn = true;
      localStorage.setItem("isLogged",user.userName)
      this.router.navigate(["ymadmin"])
      return true
    }
    return false
  }

  isLoggedIn(): boolean{
    return this.loggedIn
  }

  logOut(){
    localStorage.removeItem("isLogged")
    this.loggedIn = false
  }
}
