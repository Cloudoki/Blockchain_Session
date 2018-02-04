import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/rest/api-service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  // public profile = {name: "", email: "", iban: ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: APIService) {
    // this.profile = this.api.profile;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
