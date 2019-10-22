import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'Firebase';
import { getData } from '../../app/getData.service';
import { IonSlides, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  promotions: any;
  public greet;
 

  @ViewChild(IonSlides) slides:IonSlides;
  constructor(
    public router:Router,
    private getData: getData,
    private platform: Platform
    ) {
  
  var myDate = new Date();
  var hrs = myDate.getHours();

  if (hrs < 12)
    this.greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 17)
    this.greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24)
    this.greet = "Good Evening";

    // alert(greet);

  //   this.imageArray = [
  //     {'image':'../../assets/images/Promotionla_Image_banner_Sept_2017.jpg'},
  //     {'image':'../../assets/images/Propety-promotion-feature-Image.jpg'},
  //     {'image':'../../assets/images/promotions.png'},
  //     {'image':'../../assets/images/promotional-email-examples.jpg'}
  // ]
  }


  ionViewWillLeave(){
    this.slides.stopAutoplay();
  }
  ionViewDidEnter(){
    this.slides.startAutoplay();
  }
  
  imgSlideOpt = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  
  ngOnInit(): void {


    this.getData.read_promotion().subscribe(data => {
 
      this.promotions = data.map(e => {
        return {
          id: e.payload.doc.id,
          Description: e.payload.doc.data()['desc'],
          Name: e.payload.doc.data()['title'],
          url: e.payload.doc.data()['image'],
          startDate: e.payload.doc.data()['startdate'],
          endDate: e.payload.doc.data()['enddate'],
        };
      })
      console.log(this.promotions);
 
    });
   
  }

  viewDetails() {
    this.router.navigate(['/tabs/promotions']);
  }

}
