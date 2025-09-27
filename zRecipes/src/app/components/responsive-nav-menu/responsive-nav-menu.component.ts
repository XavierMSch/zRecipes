import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsive-nav-menu',
  templateUrl: './responsive-nav-menu.component.html',
  styleUrls: ['./responsive-nav-menu.component.scss'],
  standalone: false,
})
export class ResponsiveNavMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() { }

}