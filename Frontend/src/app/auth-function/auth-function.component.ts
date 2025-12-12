import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { UserRegistration } from '../Models/AuthModel/authModel';
import { UserLogin } from '../Models/AuthModel/authModel';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-auth-function',
  imports: [CommonModule, ReactiveFormsModule, ToastModule, ButtonModule, ProgressSpinnerModule],
  providers: [MessageService],
  templateUrl: './auth-function.component.html',
  styleUrls: ['./auth-function.component.css']
})
export class AuthFunctionComponent {
  isLogin: boolean = true;
  isPasswordMisMatch: boolean = false;
  isOtpSend: boolean = false;
  otptext: any = "Check you mail for OTP";
  otpButtonText: any = "Send OTP";
  isEmailVerified: boolean = false;
  isOtpVerified = false;
  loderStart = false;
  constructor(private authService: AuthServiceService, private messageService: MessageService, private router: Router) { }



  authForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    otp: new FormControl('',Validators.required)
    
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
    this.loderStart = true;
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
        this.authService.authStatusSubject.next(true);
        this.loderStart = false;
        this.redirectToHome();
      }, error => {
        this.showLoginFailed();
        console.error('Login Failed:', error);
        this.loderStart = false;
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
        this.loderStart = false;
        this.showRegistrationSuccess();
        this.isLogin = true;

      }, error => {
        this.showRegistrationFailed();
        console.error('Registration Failed:', error);
        this.loderStart = false;
      });
    }
  }


  sendOtp() {
    this.authService.sendOtp(this.authForm.value.email).subscribe(response => {
      this.isOtpSend = true;
      console.log(this.isOtpSend);
      this.loderStart = false;
    }, error => {
      this.showRegistrationFailed();
      this.loderStart = false;
      this.isLogin = true;
      this.otptext = "not able to send otp try again";
      this.otpButtonText = "Re-Send OTP";
    });
  }
  
  verifyOtp(){
    this.authService.verifyOtp(this.authForm.value.email,this.authForm.value.otp).subscribe(response =>{
       this.isOtpVerified = true;
       this.loderStart = false;
       this.showOTPVarified();
    }, error =>{
       this.isOtpVerified = false;
       this.loderStart = false;
       this.otptext = "You have entered wrong Otp please check again";
    })

  }

  showOTPVarified() {
    this.messageService.add({
      severity: 'success',
      summary: 'OTP Verified',
    });
  }
   
   showRegistrationSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Registration Success',
      detail: 'Returning to Login Page'
    });
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

  isEmailInvalid(): boolean {
    const email = this.authForm.get('email');
    return !!(email && email.invalid && (email.dirty || email.touched));
  }

}