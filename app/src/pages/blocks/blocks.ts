import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BlockPage } from '../block/block';
import { APIService } from '../../providers/rest/api-service';

type blocksType = Array<{id: number, creation_date:string, data: string, hash: string, miner_id: number, nonce: number, previous_hash: string}>

@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html'
})
export class BlocksPage {
  public blocks:blocksType;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: APIService) {

    this.blocks = this.api.blocks;

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
