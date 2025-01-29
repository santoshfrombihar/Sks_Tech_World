import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth-function',
  imports: [CommonModule],
  templateUrl: './auth-function.component.html',
  styleUrl: './auth-function.component.css'
})
export class AuthFunctionComponent {
  isLogin: boolean = true; // Default: Registration mode

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }
}
