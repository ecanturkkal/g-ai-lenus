import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  http = inject(HttpClient);
  router = inject(Router);

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
    this.http.post("https://localhost:7117/api/Auth/login", this.loginObj).subscribe((response: any) => {
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
    this.http.post("https://localhost:7117/api/Auth/register", this.signupObj).subscribe((response: any) => {
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
