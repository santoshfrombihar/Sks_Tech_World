import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { UserRegistration } from '../Models/AuthModel/authModel';
import { UserLogin } from '../Models/AuthModel/authModel';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-function',
  imports: [CommonModule, ReactiveFormsModule, ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './auth-function.component.html',
  styleUrl: './auth-function.component.css'
})

export class AuthFunctionComponent {
  isLogin: boolean = true;
  isPasswordMisMatch: boolean = false;

  constructor(private authService: AuthServiceService, private messageService: MessageService, private router: Router) { }

  authForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator })

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

  passwordMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.authForm.invalid && !this.isLogin) {
      return;
    }

    if (this.isLogin) {
      const userLogin: UserLogin = {
        email: this.authForm.value.email ?? '',
        password: this.authForm.value.password ?? ''
      };
      this.authService.login(userLogin).subscribe(response => {
        console.log('Login Successful:', response);
        sessionStorage.setItem('authToken', response.token);
        this.redirectToHome();
      }, error => {
        this.showLoginFailed();
        console.error('Login Failed:', error);
      });
    } else {
      const userRegistration: UserRegistration = {
        firstName: this.authForm.value.firstName || '',
        lastName: this.authForm.value.lastName || '',
        email: this.authForm.value.email || '',
        password: this.authForm.value.password || '',
      }
      this.authService.register(userRegistration).subscribe(response => {
        console.log('Registration Successful:', response);
      }, error => {
        this.showRegistrationFailed();
        console.error('Registration Failed:', error);
      });
    }
  }

  showLoginFailed() {
    this.messageService.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: 'Email or Password not correct'
    });
  }

  showRegistrationFailed() {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed',
      detail: 'Email Already Registered'
    });
  }

  redirectToHome() {
    this.router.navigate(['/home']); // Navigate to the 'home' route
  }
}
