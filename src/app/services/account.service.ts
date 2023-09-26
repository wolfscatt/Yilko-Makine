import { Injectable } from '@angular/core';
import { User } from '../admin-panel/login/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private router: Router, private http: HttpClient, private alertifyService: AlertifyService) { }
  loggedIn = false
  path = environment.path + "/admin/login"
  TOKEN_KEY = "token"

  login(user: User) {
    let headers = new HttpHeaders()
    headers = headers.append("Content-Type", "application/json")

    this.http.post<User>(this.path, user, { headers: headers }).subscribe({
      next: data => {
        this.saveToken(data['token'])
      },
      error: error => {
        this.alertifyService.error("Yanlış Kullanıcı Adı veya Şifre ")
      },
      complete: () => {
        this.loggedIn = true
        this.router.navigate(["ymadmin"])
        this.alertifyService.success(`${user.userName} başarılı bir şekilde giriş yaptı.`)
      }
    }
    )
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  isLoggedIn(): boolean {
    return this.loggedIn
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY)
    this.loggedIn = false
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

}
