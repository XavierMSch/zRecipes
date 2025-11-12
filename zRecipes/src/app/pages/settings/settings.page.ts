import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  isAdmin: boolean = true;
  adminMode: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminMode = localStorage.getItem('isAdmin') === 'true';
    // this.isAdmin = this.auth.getIsAdmin();
  }

  handleLogout() {
    this.auth.logout()
    this.router.navigate(["/login"])
  }

  handleAdminMode() {
    if (this.adminMode) {
      this.adminMode = false;
      localStorage.setItem('isAdmin', 'false');
      this.router.navigate(["/tabs/home"])
      return;
    }
    localStorage.setItem('isAdmin', 'true');
  }

}
