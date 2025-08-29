import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './Dashboard/header/header.component';
import { AuthServiceService } from './services/auth/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthServiceService,  private cdr: ChangeDetectorRef) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.isAuthenticated = !!sessionStorage.getItem('authToken');
    }
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(status => {
      this.isAuthenticated = status;
      this.cdr.detectChanges();
    });
  }
}
