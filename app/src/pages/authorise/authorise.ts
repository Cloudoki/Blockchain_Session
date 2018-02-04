import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import { APIService } from '../../providers/rest/api-service';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-authorise',
  templateUrl: 'authorise.html',
})
export class AuthorisePage {
  @ViewChild(Slides) slides: Slides;

  public url;
  public profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: APIService, public toastCtrl: ToastController) {
    this.url = this.api.APIurl;
    this.profile = this.api.profile;
  }

  storeUrl(url) {
    this.api.APIurl = url;
    localStorage.setItem("apiurl", url);
  }

  addProfile() {

    if (!this.profile.name
    ||  !this.profile.email
    ||  !this.profile.password)
      this.toastCtrl.create({ message: "Please complete all fields", duration: 2000 }).present();

    else {

      this.api.postProfile(function(data)
      {
        this.navCtrl.setRoot(HomePage);

      }.bind(this));

      this.toastCtrl.create({ message: "Rewarding 100 Thelmies for registration.", duration: 4000 }).present();

      this.gotoNextSlide();
    }
  }

  login() {

    if (!this.profile.email || !this.profile.password)
      this.toastCtrl.create({ message: "Please provide email and password", duration: 2000 }).present();

    else {
      this.api.login(function(data)
      {
        this.navCtrl.setRoot(HomePage);
        this.toastCtrl.create({ message: "Signing in Profile", duration: 2000 }).present();
      }.bind(this), function(err)
      {
        this.toastCtrl.create({ message: "Fail. E-mail and password combo not found", duration: 2000 }).present();
      }.bind(this));
    }
  }

  gotoNextSlide() {

    // Index based message
    if(this.slides.getActiveIndex() == 1)
      this.toastCtrl.create({ message: "Setting up API connection", duration: 2000 }).present();

    // next slide
    this.slides.slideNext();
  }

}
