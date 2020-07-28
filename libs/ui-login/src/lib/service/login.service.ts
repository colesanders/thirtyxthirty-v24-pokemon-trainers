import { Injectable } from '@angular/core';
import { Login } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/core-data';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated = new BehaviorSubject(true);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  mockUserProfile: Login = {
    id: '0',
    username: 'cole',
    password: '12345'
  }

  constructor(
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  attemptLogin(login: Login){
    if(login.username === this.mockUserProfile.username && login.password === this.mockUserProfile.password){
      this.isAuthenticated.next(true);
      this.router.navigate([''])
      this.snackBarService.openSnackBar("Login Succesful", "Okay", 2000);
    }else{
      this.snackBarService.openSnackBar("Login Failed, Invalid Credentials", "Okay", 2000);
    }
  }

  logout(){
    this.isAuthenticated.next(false);
  }
}
