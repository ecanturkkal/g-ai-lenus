import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'; // yolunu projene göre düzelt

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  isSignUpMode = false;

  signupObj: any = {
    Username: "",
    Password: ""
  };

  loginObj: any = {
    Username: "",
    Password: ""
  };

  toggleSignUpMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  onLogin() {
    this.apiService.post<any>('Auth/login', this.loginObj).subscribe((response: any) => {
      if (response.success) {
        localStorage.setItem("username", this.loginObj.Username);
        localStorage.setItem('gAIlenusToken', response.data);
        this.router.navigateByUrl('patients')
      } else {
        alert("Login fail: " + response.message);
      }
    });
  }

  onSignup() {
    this.apiService.post<any>('Auth/register', this.signupObj).subscribe((response: any) => {
      if (response.success) {
        alert(response.message);
        this.isSignUpMode = false;
        this.signupObj.Username = "";
        this.signupObj.Password = "";

        this.loginObj.Username = "";
        this.loginObj.Password = "";
      } else {
        alert("Sign Up Fail: " + response.message);
      }
    });
  }
}
