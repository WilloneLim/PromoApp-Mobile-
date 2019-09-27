import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FirebaseService } from '../../service/firebase.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  imageURL: string
  muser
  username: String
  sub
  image: any;

  @ViewChild('filebutton') fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController,
    public router: Router,

    
    private imagePicker: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController,
    private firebaseService: FirebaseService,
    private webview: WebView,
    public fireAuth: AngularFireAuth
    
  ) {
    this.muser = afstore.doc('users/${user.getUID()}')

   }

  ngOnInit() {
  }


  fileChanged (event){

    const files = event.target.files
    console.log(files)

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','bb32f8bcf74a6c19b8fd')

    this.http.post('https://upload.uploadcare.com/base/',data).subscribe(event => {
      console.log(event)
      this.imageURL = event.json().file
   
    })
  }

  openImagePickerCrop(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                //this.cropService.crop(results[i], {quality: 75}).then(
                 // newImage => {
                    this.uploadImageToFirebase(results[i]);
                  //},
                 // error => console.error("Error cropping image", error)
                //);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
    }

    async uploadImageToFirebase(image){

      const toast = await this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });


      let image_src = this.webview.convertFileSrc(image);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src)
    .then(photoURL => {
      this.image = photoURL;
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  logout(){
    this.fireAuth.auth.signOut().then(()=>{
      this.router.navigate(["/login"]);
    })
  }

  // openImagePicker(){
  //   this.imagePicker.hasReadPermission()
  //   .then((result) => {
  //     if(result == false){
  //       // no callbacks required as this opens a popup which returns async
  //       this.imagePicker.requestReadPermission();
  //     }
  //     else if(result == true){
  //       this.imagePicker.getPictures({
  //         maximumImagesCount: 1
  //       }).then(
  //         (results) => {
  //           for (var i = 0; i < results.length; i++) {
  //             this.uploadImageToFirebase(results[i]);
  //           }
  //         }, (err) => console.log(err)
  //       );
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  // async uploadImageToFirebase(image){
    
  //   const toast = await this.toastCtrl.create({
  //     message: 'Image was updated successfully',
  //     duration: 8000
  //   });
    
  //   let image_src = this.webview.convertFileSrc(image);
  //   let randomId = Math.random().toString(36).substr(2, 5);

  //   //uploads img to firebase storage
  //   this.firebaseService.uploadImage(image_src, randomId)
  //   .then(photoURL => {
  //     this.image = photoURL;
      
  //     toast.present();
  //   }, err =>{
  //     console.log(err);
  //   })
  // }



}
