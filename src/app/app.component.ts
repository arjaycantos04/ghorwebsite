import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showLabels = true;
  isMenuCollapsed = false;
  isMenuMinimized = true;
  showSideMenu = false; // Initialize to false by default

  constructor(private router: Router, private menuController: MenuController) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and hide the side menu on specific pages
        this.showSideMenu = this.shouldShowSideMenu(event.url);
        this.menuController.enable(this.showSideMenu, 'main-menu'); // Enable or disable the side menu
      }
    });
  }

  private shouldShowSideMenu(url: string): boolean {
    // Define the logic to determine whether the side menu should be shown
    // For example, return false for pages where you want to hide the side menu
    return !url.includes('/login'); // Example: Hide on the login page
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.menuController.enable(this.isMenuCollapsed, 'main-menu');
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  // Get the icon name with "-sharp" suffix when the route is active
  getIconName(route: string, icon: string): string {
    return this.isActive(route) ? `${icon}-sharp` : icon;
  }
}
