import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  muser: AngularFirestoreDocument
  username: string
  profilePic: string
  password: string
  npassword: string

  @ViewChild('fileBtn') fileBtn: {
		nativeElement: HTMLInputElement
	}

  constructor(
    private http: Http,
		private afs: AngularFirestore,
		private router: Router,
		private alertController: AlertController,
		private user: UserService) {
    this.muser = afs.doc(`users/${user.getUID()}`)
		
	}

  ngOnInit() {
  }

  updateProfilePic() {
		this.fileBtn.nativeElement.click()
  }
  
  uploadPic(event){
    const files = event.target.files

    const data = new FormData()
    data.append('file',files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','f49b7b74d9cfddb1eb86')

    this.http.post('https://upload.uploadcare.com/base/', data)
    		.subscribe(event => {
    			const uuid = event.json().file
    			this.muser.update({
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
    if(!this.password){
      return this.presentAlert('Error!', 'Please enter a password')
    }
    try{
      await this.user.reAuth(this.user.getUsername(), this.password)
    }catch(error){
      return this.presentAlert('Error','Wrong password')
    }

    if(this.npassword) {
      await this.user.updatePassword(this.npassword)
    }

    if(this.username !== this.user.getUsername()){
      await this.user.updateEmail(this.username)
      this.muser.update({
        username: this.username
      })
    }

    this.password = ""
    this.npassword = ""

    await this.presentAlert('Successful', 'Your profile was updated')

    this.router.navigate(['/tabs/account'])
  }

}
