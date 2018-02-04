import { Component } from '@angular/core';
import { IonicPage, ViewController, Platform, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { APIService } from '../../providers/rest/api-service';

type profileType = {id: number, email: string, name: string, password: string, thelmies: number, message: string}

@IonicPage()
@Component({
  selector: 'page-reply',
  templateUrl: 'reply.html',
})
export class ReplyPage {
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