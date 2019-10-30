import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  isPassword: boolean
 
  constructor(
	public afAuth: AngularFireAuth,
	public user: UserService,
	public router: Router,
	private navCtrl: NavController,
	private formBuilder: FormBuilder,
  private authService: AuthService,
  private toastCtrl: ToastController
		) { }

  ngOnInit() {
    this.isPassword = true;
  }

  

  async login(){
    const { username, password } = this
    try {
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})

				this.username = ""
				this.password = ""

				//this.presentToast()
				console.log("Welcome" + " " + username + " " + this.user.getUID())
        //this.presentToast()
        this.router.navigate(['/tabs'])
			}
		
		} catch(err) {
			console.dir(err)
      if(err.code == "auth/user-not-found"){
        console.log("User not found")
        document.getElementById("error").innerHTML = "No user with this email";
        
      }else if(err.code == "auth/wrong-password"){
        document.getElementById("error").innerHTML = "Incorrect Password";
      }else{
        
        document.getElementById("error").innerHTML = err.message;
      }


		}
  }

  async presentToast() {
		const toast = await this.toastCtrl.create({
		  message: 'Howdy',
		  duration: 2000
		});
		toast.present();
	}

  showpassword() {
    if(this.isPassword === true){
      this.isPassword = false;
  }
  else{
      this.isPassword = true;
  }
  }

}
