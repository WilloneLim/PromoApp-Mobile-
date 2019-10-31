import { Component, OnInit, ViewChild } from '@angular/core';
import { getData } from '../../app/getData.service';
import { IonInfiniteScroll, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { canGoBack } from '../../app/canGoBack.Service';
import { QRService } from '../../app/qr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { matches } from '@ionic/core/dist/types/components/nav/view-controller';
import { actionSheetController, toastController } from '@ionic/core';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase';
import { snapshotChanges } from '@angular/fire/database';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {

  promotions: any;
  claim: any;
  qrScan: any;

  public collectionid: string;
  public ref: any;
  item:any;
  sub

  options: BarcodeScannerOptions;
  encodeText:string = "";
  encodedData:any = {};
  scannedData:any = {};
  preventBack: any;
  promolist = [];
  promo: Array<string>;
  getid: any;
  promoitem: any;
  promoter: any;
  isCancelled: boolean;
  doc1: any;
  checklist = [];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    public getData: getData,
    public scanner: BarcodeScanner,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public alertController: AlertController,
    public canGoBack: canGoBack,
    public platform: Platform,
    public qrservice: QRService,
    public route: ActivatedRoute,
    public user: UserService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public toast: ToastController

  ) { 
    //Exit scanner when back button is pressed
    // this.platform.backButton.subscribeWithPriority(0, () => {
    // }
    
   
  }

  
  ngOnInit() {
    // this.afs.firestore.collection("claiming").doc().get()
    // .then(docSnapshot =>{
    //   if(docSnapshot.exists){
    //     console.log("EXISTS!!!!");
    //   }else{
    //     console.log("TOO BAD!");
    //   }
    // })
    var userid = this.afAuth.auth.currentUser;
    this.getid = userid.uid;
    console.log('USER ID:',this.getid);
 
    this.afs.firestore.collection('promotions')
    .where('promoter', '==', this.getid)
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

        // this.afs.firestore.collection('promoters').doc(uid).get()
        // .then(doc=>{
        //    var a = doc.data().promotions
        //    console.log(a);
        //    this.afs.firestore.collection('promotions').doc()
        //    .get().then(doc2=>{
        //      this.promotions = doc2.map(e=>{
        //        return {
        //         id: e.payload.doc.id,
        //         Author: e.payload.doc.data()['author'],
        //         Description: e.payload.doc.data()['desc'],
        //        };
        //      })
        //    })
        // })
    
      
    
      // this.afs.firestore.collection('claiming').get().then((snapshot)=>{
      //   snapshot.docs.forEach(doc1 => {
          
      //     var data1 = doc1.data();
      //     var labeldata = doc1.data();
      //     var promotionTitle = data1.title;
      //     var promotionID = data1.promotion;

      //   })
      // })
  }

  async presentAlert(title: string, content: string){
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
      })
      await alert.present()
  }

  //passing qr code data
  // async transfer(scannedData){
  //   this.router.navigate(['/transactions', scannedData])
  // }

  scanQRCode () {
    this.options= {
      preferFrontCamera : false, 
      //showFlipCameraButton : true, 
      showTorchButton:true,
      disableSuccessBeep: false,
      torchOn: false,
      prompt: 'Scan your QRcode'
    };

    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      window.alert(data);
      console.log(data.text.length);
      let qrlength = data.text.length;
      
      this.isCancelled = false;
      if(data.cancelled){
        this.isCancelled = true;
        this.navCtrl.navigateForward('/tabs/promotions');
      }
      this.navCtrl.navigateForward('/transactions');

      this.afs.firestore.collection('claiming').get().then((snapshot)=>{
        snapshot.docs.forEach(doc1 => {
          console.log(doc1.id + " "
          + doc1.data().title)
          
          var data1 = doc1.data();
          var promotionTitle = data1.title;
          var promoterid = data1.promoterID;
          this.checklist = promoterid
        })})

        if(this.checklist == this.getid){
          console.log('YES');
        }

          
        
    

     
  //     this.afs.firestore.collection('promotions').get().then((snapshot)=>{
  //       snapshot.docs.forEach(doc2 => {
  //         console.log(doc2.id + " "
  //         + doc2.data().title)

  //         var data2 = doc2.data();
  //         var promotionTitle2 = data2.title;
  //         var promotionID2 = doc2.id;
  //         var promoter = data2.promoter;

          
  //         // if (claiminig . promtions == promotions . docid )
  //         // this.afs.firestore.collection('promoters').doc(user.uid)
  //         // .get().then(doc=>{

          
  //         if(doc1.exists){
  //           if(qrlength == 20 && promotionTitle == promotionTitle2 && promotionID == promotionID2){
  //             this.navCtrl.navigateForward('/transactions');
              
  //           }else{
  //             return this.presentAlert('Error','Invalid QR Code') 
  //           }
  //         }else if(this.user.getUID != promoter && promoter == null){
  //             return this.presentAlert('Error', 'QR Code for different promoter')
              
  //         }else{
  //           return this.presentAlert('Error','QR Not Found')
  //         }
          
  //       //})
  //      }) 
  //     })
  //   })
  // })
        //  if(){
        //   this.navCtrl.navigateForward('/transactions');
        //  }else{
        //   return this.presentAlert('Error','Invalid QRCODE')
        //  }

        // }else{
        //   return this.presentAlert('Error','Invalid QRCODE')
        // }
            
      }, (err) => {
      console.log('Error: ',err);
    })
  }

}
