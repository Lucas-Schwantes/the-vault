import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cool-stuff',
  templateUrl: 'cool-stuff.html',
})
export class CoolStuffPage {

  public notWatchedItems: String [] = [];
  public item: String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage: Storage) {
    this.initializeNotWatchedItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoolStuffPage');
  }

  initializeNotWatchedItems() {
    this.notWatchedItems = [];
    this._storage.get('notWatchedItems').then((val) => {
      val.forEach(item => {
        this.notWatchedItems.push(item);
      });
    });     
  }

  getRandom(){
    this.item = this.notWatchedItems[Math.floor(Math.random()*this.notWatchedItems.length)]; 
  }

}
