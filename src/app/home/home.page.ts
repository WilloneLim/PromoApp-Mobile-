import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'Firebase';
import { getData } from '../../app/getData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  promotions: any;

  //imageArray: any = [];
  public greet;
  constructor(
    public router:Router,
    private getData: getData
    ) {
  
  var myDate = new Date();
  var hrs = myDate.getHours();

  var greet;

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

  promotion = [
    { img : 'https://firebasestorage.googleapis.com/v0/b/promotion-178a2.appspot.com/o/Images%2Fpromotion.jpg?alt=media&token=9deb8391-c13d-42c0-b5cc-96aab312f729', title : 'sample' },
    { img : 'https://firebasestorage.googleapis.com/v0/b/promotion-178a2.appspot.com/o/Images%2Fpromotion.jpg?alt=media&token=9deb8391-c13d-42c0-b5cc-96aab312f729', title : 'sample2'},
    { img : 'https://firebasestorage.googleapis.com/v0/b/promotion-178a2.appspot.com/o/Images%2Fpromotion.jpg?alt=media&token=9deb8391-c13d-42c0-b5cc-96aab312f729', title : 'sample3'}
  ]
  
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
          Description: e.payload.doc.data()['Description'],
          Name: e.payload.doc.data()['Name'],
          url: e.payload.doc.data()['url'],
        };
      })
      console.log(this.promotions);
 
    });
   
  }

  viewDetails(){
    this.router.navigate(['/tabs/promotions']);
  }

}
