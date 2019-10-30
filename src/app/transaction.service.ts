import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_trans() {
    return this.firestore.collection('transaction');
  }

  add_promoterloyaltyPoints() {
    //TEMP PROMOTER ID!!!!
    return this.firestore.collection('promotester').doc('TEST');
  }

  add_customerloyaltyPoints() {
    //TEMP CUSTOMER ID!!!!
    return this.firestore.collection(' promotester');
  }

  delete_promotion() {
    
  }

  checkTime(i) {
    var i;

    if (i < 10) {
        i = "0" + i;
      }
      return i;
  }

  created() {
    var d = new Date();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    m = this.checkTime(m);
    s = this.checkTime(s);

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

  
   return [year+'/'+ month+'/'+ '' + day + h + ":" + m + ":" + s];

   //**TEMP *//
  //  var month = new Array();
  //   month[0] = "January";
  //   month[1] = "February";
  //   month[2] = "March";
  //   month[3] = "April";
  //   month[4] = "May";
  //   month[5] = "June";
  //   month[6] = "July";
  //   month[7] = "August";
  //   month[8] = "September";
  //   month[9] = "October";
  //   month[10] = "November";
  //   month[11] = "December";
  //   var n = month[d.getMonth()];
    
  //   return [n];
  }

}