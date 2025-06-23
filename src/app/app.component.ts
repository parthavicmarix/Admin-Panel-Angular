import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from "./shared/components/header/header.component";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule,
    CommonModule, MatMenuModule, MatIconModule, MatListModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-panel';
  collapsed = false;
  darkMode = false;
  isLoggedIn = false;
  constructor(private readonly renderer: Renderer2, private readonly authService: AuthService) {
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.darkMode = true;
      this.renderer.addClass(document.body, 'dark-theme');
    }
  
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    const body = document.body;
    if (this.darkMode) {
      this.renderer.addClass(body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
