import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { TransactionService } from '../../app/transaction.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  amount: number;
  aid: string;
  scannedData: any;
  sub:any;
  getid: any;

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private transaction: TransactionService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) {
   }

  ngOnInit() {
    //passing qr code data
    this.sub = this.route.params.subscribe(params => {
      this.scannedData = params['scannedData'];
      console.log(this.scannedData);
    })
  }

  async presentModal() {
    var userid = this.afAuth.auth.currentUser;
    this.getid = userid.uid;
    console.log('THIS:',this.getid);

    if(this.amount == null) {
      console.log("Please enter the required amount");
      this.presentToast();

    }else{
      this.transaction.create_trans().add({
        //Amount: 'RM' + this.amount,
        Amount: this.amount,
        Created: this.transaction.created(),
        Promoter: this.getid
      });
      // this.transaction.add_promoterloyaltyPoints().update({
      //   LoyaltyPoint: firebase.firestore.FieldValue.increment(1)
      // });
      //this.transaction.delete_promotion(this.sub);
      //  this.transaction.add_customerloyaltyPoints().update({
      //   CustomerPoint: firebase.firestore.FieldValue.increment(10)
      // });
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      showBackdrop: true,
      backdropDismiss: false
    });
    return await modal.present();
    } 
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Please enter the required amount',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

}
