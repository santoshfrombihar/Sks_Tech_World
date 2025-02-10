import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ClassesComponent } from '../classes/classes.component';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-header',
  imports: [SidebarComponent, ClassesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string | null = null;
  userEmail: string | null = null;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
    this.userEmail = this.tokenService.getUserEmail();
  }
}
