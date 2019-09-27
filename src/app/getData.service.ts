import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
  })
  export class getData {
   
    constructor(
      private firestore: AngularFirestore
    ) { }
   
   
   
    read_promotion() {
      return this.firestore.collection('PromotionDetails').snapshotChanges();
    }
   
    update_promotion(recordID,record){
      this.firestore.doc('PromotionDetails/' + recordID).update(record);
    }
   
   
  }
   