import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { UserRegistration } from '../Models/AuthModel/authModel';
import { UserLogin } from '../Models/AuthModel/authModel';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-auth-function',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-function.component.html',
  styleUrl: './auth-function.component.css'
})

export class AuthFunctionComponent {
  isLogin: boolean = true;
  isPasswordMisMatch: boolean = false;

  constructor(private authService: AuthServiceService){}

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
 
  userRegistration: UserRegistration = {
    firstName : this.authForm.value.firstName || '',
    lastName : this.authForm.value.lastName || '',
    email :  this.authForm.value.email || '', 
    password : this.authForm.value.password || '',
  }
  userLogin : UserLogin = {
    email :  this.authForm.value.email ?? '', 
    password : this.authForm.value.password ?? '',
  }
 
  onSubmit() {
    if (this.authForm.invalid && !this.isLogin) {
      return;
    }
    
    if (this.isLogin) {
      this.userLogin.email = 'testuser';
      this.userLogin.password = 'testuser';
      console.log(this.userLogin);
      this.authService.login(this.userLogin).subscribe(response => {
        console.log('Login Successful:', response);
      }, error => {
        console.error('Login Failed:', error);
      });
    } else {
      this.authService.register(this.userRegistration).subscribe(response => {
        console.log('Registration Successful:', response);
      }, error => {
        console.error('Registration Failed:', error);
      });
    }
  }

}
