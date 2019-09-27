import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth.service';


import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirebaseService } from '../service/firebase.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Crop,
    FirebaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    WebView,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
