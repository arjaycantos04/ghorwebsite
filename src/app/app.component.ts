import { Component } from '@angular/core';
import { PetsPage } from './dashboardpages/pets/pets.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showWhatWeDoSubMenu: boolean = false;
  showWhatYouCanDoSubMenu: boolean = false;
  constructor() {}


  toggleSubMenu(subMenu: string) {
    if (subMenu === 'whatWeDo') {
      this.showWhatWeDoSubMenu = !this.showWhatWeDoSubMenu;
    } else if (subMenu === 'whatYouCanDo') {
      this.showWhatYouCanDoSubMenu = !this.showWhatYouCanDoSubMenu;
    }
  }
}
