import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { AuthServiceService } from '../../services/auth/auth-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string | null = null;
  userEmail: string | null = null;

  constructor(private tokenService: TokenService, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
    this.userEmail = this.tokenService.getUserEmail();
  }

  logout(){
    this.authService.logout();
  }

}
