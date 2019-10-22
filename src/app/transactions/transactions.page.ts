import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { TransactionService } from '../../app/transaction.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  amount: any;
  aid: string;

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private transaction: TransactionService,
    private toastCtrl: ToastController
  ) {
   }

  ngOnInit() {
  }

  async presentModal() {

    if(this.amount == null) {
      console.log("Please enter the required amount");
      this.presentToast();

    }else{
      this.transaction.create_trans().add({
        //Amount: 'RM' + this.amount,
        Amount: this.amount,
        Created: this.transaction.created()
      });
      this.transaction.add_promoterloyaltyPoints().update({
        LoyaltyPoint: firebase.firestore.FieldValue.increment(1)
      });
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
