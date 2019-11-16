import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { TransactionService } from '../../app/transaction.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { QRService } from '../../app/qr.service';
import { UserService } from '../../app/user.service';
import { take } from 'rxjs/operators';
import { getData, Promo } from '../../app/getData.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';


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
  claim: any;
  promo:any;
  promoinfo: any;

  claimer: any;
  claimerTrans: any;
  cl: any;
  cc: any;

  algo: any;
  userin: any;

  num: any;

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private getData: getData,
    private transaction: TransactionService,
    public qrservice: QRService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private usersinfo: UserService,
    public alertController: AlertController
  ) {
   }


  ngOnInit() {
    //passing qr code data
    this.sub = this.route.queryParams.subscribe(params => {
      this.scannedData = params['scan'];
      this.promo =  params['promo'];
    });

    this.qrservice.getClaim(this.scannedData).subscribe(res => {
      this.claim = res;
      if (this.claim.promotion == this.promo){
        this.claimer = this.claim.user;
        window.alert("Correct: " + this.claim.promotion + " = " + this.promo);
      }else{
        
        window.alert("inCorrect: " + this.claim.promotion + " = " + this.promo);
        // this.presentAlert('Error','Invalid QR Code');
      }


    })

    
    
  }


  async presentAlert(title: string, content: string){
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
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
        //Created: this.transaction.created(),
        Created: firebase.firestore.FieldValue.serverTimestamp(),
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

    this.usersinfo.getUserInfo(this.claimer).pipe(take(1)).subscribe(res => {
      this.cl = res;
      this.cc = this.cl.transactions;
      
      this.userin = this.cl.reco;

      this.firestore.collection('users').doc(this.claimer).update({transactions: this.cc +1});

      this.fixAlgo(this.userin);
    });

    
    this.qrservice.delClaim(this.scannedData);
    
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

  async fixAlgo(memap: any){
    this.getData.getPromo(this.promo).pipe(take(1)).subscribe(res => {
      this.promoinfo = res.keys;

        switch (this.promoinfo[0]) {
          case "food":
            this.num = parseInt(memap.food) + 1
            memap.food = this.num;
            break;
          case "drink":
            this.num = parseInt(memap.drink) + 1
            memap.drink = this.num;
            break;
          case "clothes":
            this.num = parseInt(memap.clothes) + 1
            memap.clothes = this.num;
            break;  
          case "bags":
            this.num = parseInt(memap.bags) + 1
            memap.bags = this.num;
            break;
          case "shoe":
            this.num = parseInt(memap.shoe) + 1
            memap.shoe = this.num;
            break;    
          default:
            this.num = parseInt(memap.other) + 1
            memap.other = this.num;
        }

        // window.alert(memap.drink);
        this.firestore.collection('users').doc(this.claimer).update({reco: memap});

    });
  }

}
