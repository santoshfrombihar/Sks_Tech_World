import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ClassesComponent } from '../classes/classes.component';
@Component({
  selector: 'app-header',
  imports: [SidebarComponent, ClassesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
