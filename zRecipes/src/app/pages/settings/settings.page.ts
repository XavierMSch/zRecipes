import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  isAdmin: boolean = false;
  adminMode: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit() {
    this.loadAdminStatus(); 
    this.adminMode = localStorage.getItem('isAdmin') === 'true';
  }

  handleLogout() {
    this.auth.logout()
    this.router.navigate(["/login"])
  }

  handleAdminMode() {
    if (this.adminMode) {
      this.adminMode = false;
      localStorage.setItem('isAdmin', 'false');
      window.location.href = "/tabs/home";

      return;
    }
    localStorage.setItem('isAdmin', 'true');
    window.location.href = "/reports";
  }

  loadAdminStatus() {
    const token = this.auth.getCurrentAuthToken();

    if (token) {
      this.user.getIsAdmin(token).subscribe({
        next: (isAdmin: boolean) => {
          this.isAdmin = isAdmin;
        },
        error: (error) => {
          this.adminMode = false;
          console.error('Error al obtener estado de administrador:', error);
        }
      });
    }
  }
}
