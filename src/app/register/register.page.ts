import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	email: string = ""
	password: string = ""
	cpassword: string = ""
	isPassword: boolean
	isPassword2: boolean

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router,
		private toastCtrl: ToastController
		) { }


	ngOnInit() {
		this.isPassword = true;
		this.isPassword2 = true;
	} 

	async register() {
		const { username, email, password, cpassword } = this
		if(password !== cpassword) {
			document.getElementById("error").innerHTML = "Password doesn't match, please re-enter password";
			return console.error("Passwords doesn't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)

			this.afstore.doc(`users/${res.user.uid}`).set({
				username
			})

			this.user.setUser({
				username,
				uid: res.user.uid
			})

			this.presentToast()
			this.router.navigate(['/login'])

		} catch(error) {
			console.dir(error)
			if(error.code == "auth/invalid-email"){
				console.log("Invalid email")
				document.getElementById("error").innerHTML = "Invalid Email, please include '@' in your email";
			}

		}
	}

	async presentToast() {
		const toast = await this.toastCtrl.create({
		  message: 'Account successfully created',
		  duration: 2000
		});
		toast.present();
	}

	showpassword1() {
		if(this.isPassword === true){
			this.isPassword = false;
		}
		else{
			this.isPassword = true;
		}
	}

	showpassword2() {
		if(this.isPassword2 === true){
			this.isPassword2 = false;
		}
		else{
			this.isPassword2 = true;
		}
	}

}