import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

type profileType = {id: number, email: string, name: string, password: string, thelmies: number, message: string}
type profilesType = Array<{id: number, email: string, name: string, password: string, thelmies: number, message: string}>

@Injectable()
export class APIService {

  APIurl = '';
  Oauthurl = 'https://tex-oauth.eu-gb.mybluemix.net/';

  public blocks = [];
  public profile = {id: 0, name: "", email: "", password: "", thelmies: "", message: ""}
  public profiles: profilesType;

  constructor(private http:Http, public toastCtrl: ToastController) {

    if(localStorage.getItem("apiurl"))
      this.APIurl = localStorage.getItem("apiurl");

    if(localStorage.getItem("profile"))
      this.profile = JSON.parse(localStorage.getItem("profile"));
  }

/*  me() {
    // Catch empty
    if(!this.profile.id)
      this.toastCtrl.create({ message: "You are not logged in correctly. Log out.", duration: 2000 }).present();

    this.getProfile(this.profile.id, this.storeProfile.bind(this));
  }*/

  me() {
    // Catch empty
    if(!this.profile.id)
      this.toastCtrl.create({ message: "You are not logged in correctly. Log out.", duration: 5000 }).present();

    var endpoint = this.urlFormat("/profiles/" + this.profile.id);

    return new Promise((resolve, reject) => {
      this.http.get(endpoint).map(res => res.json()).subscribe(
        data => {
          this.profile = data;
          resolve(this.profile)
      });
    })
  }

  getProfile(id, callback) {
    var endpoint;

    // default request
    endpoint = this.urlFormat("/profiles/" + id);

    this.http.get(endpoint).map(res => res.json()).subscribe(
      data => { if(callback) callback(data) }
    );
  }

  getBlock(id, callback) {
    var endpoint;

    // default request
    endpoint = this.urlFormat("/blocks/" + id);

    this.http.get(endpoint).map(res => res.json()).subscribe(
      data => { if(callback) callback(data) }
    );
  }

  getProfiles() {

    var endpoint = this.urlFormat("/profiles");

    return new Promise((resolve, reject) => {
      this.http.get(endpoint).map(res => res.json()).subscribe(
        data => {
          this.profiles = data;
          resolve(this.profiles)
      });
    });
  }

  getBlocks() {

    var endpoint = this.urlFormat("/blocks");

    return new Promise((resolve, reject) => {
      this.http.get(endpoint).map(res => res.json()).subscribe(
        data => {
          this.blocks = data;
          for(var key in this.blocks)
          {
            this.blocks[key].dataParsed = JSON.parse(this.blocks[key].data);
          }
          resolve(this.blocks)
      });
    })

    /*this.http.get(endpoint).map(res => res.json()).subscribe(
      data => {
        this.blocks = data;
    });*/
  }

  getFeedback(list) {

    return list;
  }

  getTransactions(account_id, callback) {

    var endpoint = this.urlFormat("/accounts/" + account_id + "/transactions");

    this.http.get(endpoint).map(res => res.json()).subscribe(
      data => {
        callback(data)
    });
  }

  postProfile(callback) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    var endpoint = this.urlFormat("/profiles");
    var response = this.http.post(endpoint, JSON.stringify(this.profile), options).map(res => res.json());

    response.subscribe(
      data => {
          this.profile = data;
          localStorage.setItem("profile", JSON.stringify(data));

          callback(data);
      }
    );

    return response;
  }

  postBlock(profile, feedback) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    var req = {profile_id: profile.id, miner_id: this.profile.id, feedback: feedback}
    var endpoint = this.urlFormat("/blocks");

    return new Promise((resolve, reject) => {
      this.http.post(endpoint, JSON.stringify(req), options).map(res => res.json()).subscribe(
        data => {
          resolve(data);
      });

    });
  }
  
  postQuestion(profile, question) {
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    var req = {message: question}
    var endpoint = this.urlFormat("/profiles/" + profile.id);

    return new Promise((resolve, reject) => {
      this.http.put(endpoint, JSON.stringify(req), options).map(res => res.json()).subscribe(
        data => {

          this.blocks.push(data);
          resolve(data);
      });

    });
  }

  postTransactionConfirm(id, payload, callback) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});

    var endpoint = this.urlFormat("/accounts/" + id + "/transactions/confirm");
    var response = this.http.post(endpoint, JSON.stringify(payload), options).map(res => res.json());

    response.subscribe(
      data => {
          callback(data);
      }
    );

    return response;
  }

  login(callback, errorCallback) {

    let req = {params: {"email": this.profile.email, "password": this.profile.password}};
    var endpoint = this.urlFormat("/login");
    var response = this.http.get(endpoint, req).map(res => res.json());

    response.subscribe(
      data => {
        this.storeProfile(data);
        callback(data);
      },
      err => { errorCallback(err) }
    );

    return response;
  }

  storeProfile(profile) {

    if(profile)
    {
      // remove pw
      profile.password = '';

      this.profile = profile;
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }

  urlFormat(endpoint: string) {
    return "http://" + this.APIurl + "/v1" + encodeURI(endpoint);
  }
}
