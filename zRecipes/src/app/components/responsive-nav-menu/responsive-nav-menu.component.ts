import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-responsive-nav-menu',
  templateUrl: './responsive-nav-menu.component.html',
  styleUrls: ['./responsive-nav-menu.component.scss'],
  standalone: false,
})
export class ResponsiveNavMenuComponent implements OnInit {
  AdminMode: boolean = false;
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }  

  getIconName(baseIcon: string, route: string): string {
  const isActive = this.currentRoute === route || 
                  this.currentRoute === `/tabs${route}` ||
                  this.currentRoute.startsWith(route);
  
  return isActive ? baseIcon.replace('-outline', '') : baseIcon;
  }
  getTabIconName(baseIcon: string, tabRoute: string): string {
    const fullTabRoute = `/tabs${tabRoute}`;
    const isActive = this.currentRoute === fullTabRoute || 
                    this.currentRoute === tabRoute ||
                    this.currentRoute.startsWith(fullTabRoute);
    
    return isActive ? baseIcon.replace('-outline', '') : baseIcon;
  }

  isRouteActive(route: string): boolean {
    return this.currentRoute === route || 
           this.currentRoute === `/tabs${route}` ||
           this.currentRoute.startsWith(route);
  }

  ngOnInit() { 
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus == 'true') {
      this.AdminMode = true;
    }
    else if (adminStatus == 'false') {
      this.AdminMode = false;
    }
  }
}