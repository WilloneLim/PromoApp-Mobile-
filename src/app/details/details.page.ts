import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore'
import { getData, Promo } from '../../app/getData.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  promo: Promo = {
    title: 'Title',
    image: 'image',
    promoter: 'promoter',
    keys: []
  }
  promoId = null;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private getData: getData
  ) { }

  ngOnInit() {
    this.promoId = this.route.snapshot.params['id'];
    if(this.promoId){
      console.log(this.promoId);
      this.loadPromo();

    }
  }

  loadPromo() {
    // console.log(this.promoId);
    this.getData.getPromo(this.promoId).subscribe(res => {
      this.promo = res;
      console.log(this.promo.image);
    })
  }

  scanQR() {
    
  }

}
