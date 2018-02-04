import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/rest/api-service';

/**
 * Generated class for the BlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-block',
  templateUrl: 'block.html',
})
export class BlockPage {
  public block;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: APIService)
  {
    this.block = this.navParams.get("block");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockPage');
  }

}
