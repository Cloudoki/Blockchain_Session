import { Component } from '@angular/core';
import { IonicPage, ViewController, Platform, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { BlockPage } from '../block/block';
import { APIService } from '../../providers/rest/api-service';

type profileType = {id: number, email: string, name: string, password: string, thelmies: number}
type blockType = {id: number, creation_date:string, data: string, hash: string, miner_id: number, nonce: number, previous_hash: string}
type blocksType = Array<{id: number, creation_date:string, data: string, hash: string, miner_id: number, nonce: number, previous_hash: string}>

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  public profile: profileType;
  public nonce: number;
  public latest_block: string;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public api: APIService, public toastCtrl: ToastController)
  {
    this.profile = this.navParams.get("profile");
    this.nonce = 1;
    this.latest_block = "requesting...";

    if(this.api.blocks[0])
      this.latest_block = this.api.blocks[0].previous_hash;

    this.api.getBlocks().then((response: blocksType) => {
      this.latest_block = response[0].previous_hash;
      this.postBlock();
    });

    // if(navParams.data.creditor)
    //   this.creditor = navParams.data.creditor;
  }

  postBlock() {

    var itv = setInterval(function(){ this.nonce++; }.bind(this), 60);

    this.api.postBlock(
      this.navParams.get("profile"),
      this.navParams.get("response")
    ).then((response: blockType) => {

      if(this.profile)
        this.profile.message = "";

      response.dataParsed = JSON.parse(response.data);
      clearInterval(itv);

      this.toastCtrl.create({ message: "Block successfully mined. Earned 25 thelmies", duration: 3000 }).present();

      this.navCtrl.push(BlockPage, { block: response });
    });

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
