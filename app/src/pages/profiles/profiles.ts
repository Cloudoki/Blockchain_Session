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

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: APIService) {

    this.profiles = this.api.profiles;

    this.api.getProfiles().then((response: profilesType) => {
      this.profiles = response;
    });
  }

  itemSelected(profile) {
    this.navCtrl.push(ProfilePage, {
      profile: profile
    });
  }
}
