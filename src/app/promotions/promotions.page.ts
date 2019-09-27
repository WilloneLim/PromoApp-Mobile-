import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {

  constructor() { }

  promotion = [
    { img : '../../assets/images/promotions.png', title : 'sample' },
    { img : '../../assets/images/promotional-email-examples.jpg', title : 'sample2'},
    { img : '../../assets/images/Promotionla_Image_banner_Sept_2017.jpg', title : 'sample3'}
  ]
  
  ngOnInit() {
  }

}
