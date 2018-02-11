import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { APIService } from '../../providers/rest/api-service';

type profilesType = Array<{id: number, email: string, name: string, password: string, thelmies: number, message: string}>

@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html'
})
export class ProfilesPage {
  public profiles: profilesType;
  public polling

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: APIService) {

    this.profiles = this.api.profiles;

    this.getProfiles()
    this.polling = setInterval(() => {
      this.getProfiles()
    }, 30000)
  }

  getProfiles() {
    this.api.getProfiles().then((response: profilesType) => {
      this.profiles = response;
    });
  }

  ionViewDidLeave() {
    clearInterval(this.polling)
  }

  itemSelected(profile) {
    this.navCtrl.push(ProfilePage, {
      profile: profile
    });
  }
}
