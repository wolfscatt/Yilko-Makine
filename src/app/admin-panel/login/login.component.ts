import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { AccountService } from 'src/app/services/account.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = new User()
  constructor(private accountService: AccountService, private alertifyService: AlertifyService){}
  login(form: NgForm){
    let logged = this.accountService.login(this.user)
    if(logged){
      this.alertifyService.success(`${this.user.userName} başarılı bir şekilde giriş yaptı.`)
    }else{
      this.alertifyService.error("Yanlış Kullanıcı Adı veya Şifre")
    }

  }
}
