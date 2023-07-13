import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  currentCard: number = 0;

  closeCard(cardNumber: number) {
    this.currentCard = cardNumber;  
  }

  
  

  constructor() { }

  ngOnInit() {
  }

}
