import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';


export interface Promo {
  title: string;
  promoter: string ;
  image: string;
  keys: Array<String>;
}

@Injectable({
    providedIn: 'root'
  })
  export class getData {
    
    private promoCollection: AngularFirestoreCollection<Promo>;
    private promo: Observable<Promo[]>;
    
    constructor(
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth
    ) {

        this.promoCollection = afs.collection<Promo>('promotions');
    
        this.promo = this.promoCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data};
            });
          })
        );
      // var getid = afAuth.auth.currentUser;

      // this.promoCollection = afs.collection<Promo>('promotions', 
      // ref => ref.where('promoter', '==', getid))
      // this.promo = this.promoCollection.snapshotChanges().pipe(
      //   map(actions => {
      //     return actions.map(a => {
      //       const data = a.payload.doc.data();
      //       const id = a.payload.doc.id;
      //       return { id, ...data};
      //     });
      //   })
      // );
    }
   
    getpromo() {
      return this.promo;
    }

    getPromo(id){
      return this.promoCollection.doc<Promo>(id).valueChanges();
    }
   
    read_promotion() {
    
      return this.afs.collection('promotions').snapshotChanges();
  
      
    }
   
    // update_promotion(recordID,record){
    //   this.firestore.doc('promotions/' + recordID).update(record);
    // }
   
   
  }
   