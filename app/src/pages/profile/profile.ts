import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MinePage } from '../mine/mine';
import { APIService } from '../../providers/rest/api-service';

type profileType = {id: number, email: string, name: string, password: string, thelmies: number, message: string}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public profile: profileType;
  public response;
  public same;
  // public transactions; //: Array<{title: string, text: string, iban: string, profile: Array<{title: string, text: string, iban: string}>}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: APIService)
  {
    this.profile = this.navParams.get("profile");

    this.same = this.profile.id == this.api.profile.id

    // this.api.getTransactions(this.profile.account_id, function (list)
    // {
    //   this.transactions = list;
    // }.bind(this));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  mine() {
    this.navCtrl.push(MinePage, {
      response: this.response,
      profile: this.profile
    });
  }
}
