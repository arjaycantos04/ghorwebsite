import { Component, OnInit, Input } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';


interface Announcement {
  title: string;
  content: string;
  // ...other properties
}

@Component({
  selector: 'app-announcement-details-modal',
  templateUrl: './announcement-details-modal.page.html',
  styleUrls: ['./announcement-details-modal.page.scss'],
})
export class AnnouncementDetailsModalPage implements OnInit {
  @Input() announcementId: string = '';
  announcement: Announcement | null = null;

  constructor(private firestore: Firestore, private modalController: ModalController) {}

  ngOnInit() {
    this.loadAnnouncementDetails();
  }

  async loadAnnouncementDetails() {
    try {
      const announcementDoc = doc(this.firestore, 'announcements', this.announcementId);
      const announcementSnapshot = await getDoc(announcementDoc);

      if (announcementSnapshot.exists()) {
        this.announcement = announcementSnapshot.data() as Announcement;
      } else {
        // Handle the case where the announcement doesn't exist.
      }
    } catch (error) {
      console.error('Error fetching announcement details:', error);
    }
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }
  
}
