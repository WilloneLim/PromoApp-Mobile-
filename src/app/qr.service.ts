import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
     
    }
