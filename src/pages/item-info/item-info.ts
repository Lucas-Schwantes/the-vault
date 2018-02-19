import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Result } from '../../domain/result';

@IonicPage()
@Component({
  selector: 'page-item-info',
  templateUrl: 'item-info.html',
})
export class ItemInfoPage {

  public item: Result;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.item = new Result();
    this.item = this.navParams.get('item');
    /*if (this.item.Ratings.length < 3){
      this.item.Ratings = [{Source : 'N/A',
      Value : (this.item.Metascore+'/10')},
      {Source : 'N/A',
      Value : (this.item.imdbRating+'/10')},
      {Source : 'N/A',
      Value : 'N/A'}]
    }*/
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemInfoPage');
  }

}
