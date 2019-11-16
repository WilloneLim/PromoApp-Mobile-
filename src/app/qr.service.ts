import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Claim {
  promoterID: string ;
  promotion: string;
  title: string;
  user: string;
}

@Injectable()
export class QRService {
    private data;
    constructor(private firestore: AngularFirestore) {

    }
    
    getCollection() {
      return this.firestore.collection('claiming').snapshotChanges();
      }

    
    getRef() {
      return this.firestore.collection('claiming').doc();
    }

    getClaim(id){
      return this.firestore.collection('claiming').doc<Claim>(id).valueChanges();
    }

    delClaim(id){
      return this.firestore.collection('claiming').doc(id).delete();
    }
     
    }
