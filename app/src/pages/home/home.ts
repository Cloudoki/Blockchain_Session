import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { APIService } from '../../providers/rest/api-service';
import { BlockPage } from '../block/block';

type profileType = {id: number, email: string, name: string, password: string, thelmies: number, message: string}
type blocksType = Array<{id: number, creation_date:string, data: string, hash: string, miner_id: number, nonce: number, previous_hash: string}>

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public profile: profileType;
  public blocks:blocksType;

  constructor(public navCtrl: NavController, public api: APIService) {

    this.profile = this.api.profile;
    this.blocks = this.api.blocks;

    this.api.me().then((response: profileType) => {
      this.profile = response;
    });

    this.api.getBlocks().then((response: blocksType) => {
      this.blocks = response;
    });
  }

  itemSelected(block) {

    this.navCtrl.push(BlockPage, {
      block: block
    });
  }
}
