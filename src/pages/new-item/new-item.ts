import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ItemInfoPage } from '../item-info/item-info';

// ITS A MODAAALLL
@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {

  public type: String;
  public mode: String;
  public input: String;
  public result: String[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public http : Http
  ) {

    this.type = navParams.get('type');
    this.mode = navParams.get('mode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewItemPage' + this.mode, this.type);
  }

  dismissModal(){
    this.viewCtrl.dismiss(null);
  }

  search(){
    let loader = this.loadingCtrl.create({
      content: 'Searching for your items...'
    });
    loader.present();

    this.http.get('http://www.omdbapi.com/?apikey=ae542b8a&s='+ this.input +'&type='+this.type)
    .map(res => res.json())
    .toPromise()
    .then(data => {
      if(data.Response == "True"){
        this.result = [];
        data.Search.forEach(item => {
          this.result.push(item);              
        });
        console.log(this.result);
        loader.dismiss();
      }else{
        console.log(data.Error);
        loader.dismiss();
      }
      
      console.log(data);
    })
  }

  add(item){
    this.http.get('http://www.omdbapi.com/?apikey=ae542b8a&i='+ item.imdbID)
    .map(res => res.json())
    .toPromise()
    .then(data => {
      let alert = this.alertCtrl.create();
        alert.setTitle('New item');

        alert.addInput({
          type: 'radio',
          label: 'Watched',
          value: 'watched',
          checked: true
        });
      alert.addInput({
        type: 'radio',
        label: 'To-Be-Watched',
        value: 'notWatched',
        checked: false
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: option => {
          this.viewCtrl.dismiss({data,option});
        }
      });
      alert.present();
      
    })
  }

  itemInfo(item){
    this.http.get('http://www.omdbapi.com/?apikey=ae542b8a&i='+ item.imdbID)
    .map(res => res.json())
    .toPromise()
    .then(data => {
      this.navCtrl.push(ItemInfoPage, {item : data});
    })
    
  }
  

}
