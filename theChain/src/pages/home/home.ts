import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { APIService } from '../../providers/rest/api-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public polling;
  public profiles;
  public blocks;

  constructor(public navCtrl: NavController, public api: APIService) {

    localStorage.setItem('apiurl', '192.168.0.101:5001')

    this.getProfiles()
    this.getBlocks()

    this.polling = setInterval(() => {
      this.getProfiles()
      this.getBlocks()
    }, 10000)
  }

  getProfiles() {
    this.api.getProfiles().then((response) => {
      this.profiles = response;
    });
  }

  getBlocks() {
    this.api.getBlocks().then((response) => {
      this.blocks = response;
    });
  }

  ionViewDidLeave() {
    clearInterval(this.polling)
  }
}
