import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  modalTitle:string;
  modelId:number;
 
  constructor(
    private modalCtrl: ModalController,
     private navParams: NavParams,
     private router: Router
  ) { }

  ngOnInit() {console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    
    await this.modalCtrl.dismiss();
    this.router.navigate(['/tabs/promotions']);
  }


}
