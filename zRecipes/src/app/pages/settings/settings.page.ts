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

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  handleLogout() {
    this.auth.logout()
    this.router.navigate(["/login"])
  }

}
