import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-notification-popover',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  notifications: any[] = [
    {
      number:'4',
    },
    
    
    // Add more notifications as needed
  ];

  constructor(private popoverController: PopoverController) {}

  closePopover() {
    this.popoverController.dismiss();
  }


  transform(timestamp: number): string {
    const currentTime = new Date().getTime();
    const diffInSeconds = Math.floor((currentTime - timestamp) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    }
  }
}
