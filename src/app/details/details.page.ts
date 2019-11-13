import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {AngularFirestore} from '@angular/fire/firestore'
import { getData, Promo } from '../../app/getData.service';
import { QRService } from '../../app/qr.service';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { IonInfiniteScroll, Platform, ToastController, NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { defineBase, query } from '@angular/core/src/render3';

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
  options: BarcodeScannerOptions;
  isCancelled: boolean = true;
  scannedData:any = {};
  check= [];
  data1=[];

  getid: any;
  isValid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private getData: getData,
    public scanner: BarcodeScanner,
    public navCtrl: NavController,
    public qrservice: QRService,
    public router: Router,
    public toast: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.promoId = this.route.snapshot.params['id'];
    if(this.promoId){
      console.log(this.promoId);
      this.loadPromo();
    }

    var userid = this.afAuth.auth.currentUser;
    this.getid = userid.uid;
    console.log('USER ID:',this.getid);
  }

  loadPromo() {
    // console.log(this.promoId);
    this.getData.getPromo(this.promoId).subscribe(res => {
      this.promo = res;
      console.log(this.promo.image);
    })
  }

  scanQRCode () {
    this.options= {
      preferFrontCamera : false, 
      //showFlipCameraButton : true, 
      showTorchButton:true,
      disableSuccessBeep: false,
      torchOn: false,
      prompt: 'Scan your QRcode'
    };

    this.isCancelled = false;
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      console.log(data.text.length);
      let qrlength = data.text.length;
      this.isCancelled = true;


            if(qrlength == 20){
              this.navCtrl.navigateForward('/transactions');
              
            }else{
              this.presentAlert('Error','Invalid QR Code')   
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
        this.isCancelled = true;
      console.log('Error: ',err);
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

  ionViewCanLeave() {
    return this.isCancelled;
  }
}

