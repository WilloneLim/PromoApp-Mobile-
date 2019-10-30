import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'Firebase';
import { Promo, getData } from '../../app/getData.service';
import { IonSlides, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';

export interface Item { title: string; image: string; }

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  promotions: any;
  public greet;
  public title: string;
  //promolist: Promo[];
  promolist =[];

  @ViewChild(IonSlides) slides:IonSlides;
  constructor(
    public router:Router,
    private getData: getData,
    private platform: Platform,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
    ) {
  
  var myDate = new Date();
  var hrs = myDate.getHours();

  if (hrs < 12)
    this.greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 17)
    this.greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24)
    this.greet = "Good Evening";

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
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  };
  
  ngOnInit(): void {

   var userid = this.afAuth.auth.currentUser;
   var getid = userid.uid;
   console.log(getid);

   //TEMPPPP
  //  this.getData.getpromo().subscribe(res => {
  //    this.promolist = res;
  //  })


   this.afs.firestore.collection('promotions')
   .where('promoter', '==', getid)
   .limit(4)
   .get()
   .then(querySnapshot => {
     querySnapshot.forEach(doc=>{
        console.log(doc.id, "=>", doc.data());
        this.promolist.push({
          id: doc.id,
          Name: doc.data().title,
          Description: doc.data().desc,
          url: doc.data().image,
          startDate: doc.data().startdate,
          endDate: doc.data().enddate
        })
     });
   }).catch(function(error){
     console.log(error);
   })



    // this.getData.read_promotion().subscribe(data => {
 
    //   this.promotions = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       Description: e.payload.doc.data()['desc'],
    //       Name: e.payload.doc.data()['title'],
    //       url: e.payload.doc.data()['image'],
    //       startDate: e.payload.doc.data()['startdate'],
    //       endDate: e.payload.doc.data()['enddate'],
    //     };
    //   })
    //   console.log(this.promotions);
 
    // });
   
  }

  viewDetails() {
    this.router.navigate(['/tabs/promotions']);
  }

}
