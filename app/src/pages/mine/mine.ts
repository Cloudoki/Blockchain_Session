import { Component } from '@angular/core';
import { IonicPage, ViewController, Platform, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { BlockPage } from '../block/block';
import { APIService } from '../../providers/rest/api-service';

type profileType = {id: number, email: string, name: string, password: string, thelmies: number, message: string}
type blockType = {id: number, creation_date:string, data: string, hash: string, miner_id: number, nonce: number, previous_hash: string, dataParsed: object}
type blocksType = Array<{id: number, creation_date:string, data: string, hash: string, miner_id: number, nonce: number, previous_hash: string}>

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  public profile: profileType;
  public question: string;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public api: APIService, public toastCtrl: ToastController)
  {
    this.profile = this.api.profile;
  }

  postQuestion() {
    this.api.postQuestion(this.profile, this.question).then(response => {
      this.toastCtrl.create({ message: "Your question has been posted", duration: 5000 }).present();
    })
  }

}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class ModalContentPage {

  constructor(public platform: Platform, public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {}

  origin() {}
	confirmation (data) {}
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
