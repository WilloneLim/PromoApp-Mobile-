import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Crop } from '@ionic-native/crop/ngx';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  username: string
  profilePic: string
  password: string
  npassword: string
  busy: boolean = false

  @ViewChild('fileBtn') fileBtn: {
		nativeElement: HTMLInputElement
	}

  constructor(
    private http: Http,
		private afs: AngularFirestore,
		private router: Router,
    private alertController: AlertController,
    private cropService: Crop,
		private user: UserService) {
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.username = event.username
			this.profilePic = event.profilePic
		})
		
	}

  ngOnInit() {
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
	}

  updateProfilePic() {
		this.fileBtn.nativeElement.click()
  }
  
  
  cropImage(imgPath) {
    this.cropService.crop(imgPath, { quality: 50 })
      
    }
 
  uploadPic(event){
    const files = event.target.files

    const data = new FormData()
    this.cropImage(data);
    data.append('file',files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','bb32f8bcf74a6c19b8fd')

    this.http.post('https://upload.uploadcare.com/base/', data)
    		.subscribe(event => {
    			const uuid = event.json().file
    			this.mainuser.update({
    				profilePic: uuid
    			})
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


  async updateDetails(){
    this.busy = true

    if(!this.password){
      this.busy = false
      return this.presentAlert('Error!', 'Please enter a password')
    }
    try{
      await this.user.reAuth(this.user.getUsername(), this.password)
    }catch(error){
      this.busy = false
      return this.presentAlert('Error','Wrong password')
    }

    if(this.npassword) {
      await this.user.updatePassword(this.npassword)
    }

    if(this.username !== this.user.getUsername()){
      await this.user.updateEmail(this.username)
      this.mainuser.update({
        username: this.username
      })
    }

    this.password = ""
    this.npassword = ""
    this.busy = false

    await this.presentAlert('Successful', 'Your profile was updated')

    this.router.navigate(['/tabs/account'])
  }

}
