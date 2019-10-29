import {Injectable} from '@angular/core'
import {Router, CanActivate} from '@angular/router'
import {UserService} from './user.service'
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService implements CanActivate {

 constructor(private router: Router, private user: UserService){

 }

 async canActivate(route){
   if(await this.user.isAuthenticated()){
     return true
   }
   this.router.navigate(['/login'])
   return false
 }

//  registerUser(value){
//   return new Promise<any>((resolve, reject) => {
//     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
//     .then(
//       res => resolve(res),
//       err => reject(err))
//   })
//  }

//  loginUser(value){
//   return new Promise<any>((resolve, reject) => {
//     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
//     .then(
//       res => resolve(res),
//       err => reject(err))
//   })
//  }

//  logoutUser(){
//    return new Promise((resolve, reject) => {
//      if(firebase.auth().currentUser){
//        firebase.auth().signOut()
//        .then(() => {
//          console.log("LOG Out");
//          resolve();
//        }).catch((error) => {
//          reject();
//        });
//      }
//    })
//  }

 

}