import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { NewItemPage } from '../new-item/new-item';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ItemInfoPage } from '../item-info/item-info';

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {

  searchQuery: string = '';
  watchedItems: string[] = [];
  notWatchedItems: string[] = [];
  mode: string = "watched";
  exibitMode: string = "list";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private _http : Http,
    private _storage: Storage
  ) {
    this.initializeWatchedItems();
    this.initializeNotWatchedItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }

  changeExibitMode(){
    if(this.exibitMode == 'grid'){
      this.exibitMode = "list";
    }else{
      this.exibitMode = "grid";
    }
    
  }

  initializeWatchedItems() {
    this.watchedItems = [];
    this._storage.get('watchedItems').then((val) => {
      if(val != null){
        val.forEach(item => {
          this.watchedItems.push(item);
        });
      }else{
        this._storage.set('watchedItems', this.watchedItems);
      }
    });   
  }

  initializeNotWatchedItems() {
    this.notWatchedItems = [];
    this._storage.get('notWatchedItems').then((val) => {
      if(val != null){
        val.forEach(item => {
          this.notWatchedItems.push(item);
        });
      }else{
        this._storage.set('notWatchedItems', this.notWatchedItems);
      }

    });   
  }

  itemInfo(item){
    this.navCtrl.push(ItemInfoPage, {item : item});
  }

  watch(item){
    this.watchedItems.push(item);
    let index = this.notWatchedItems.indexOf(item);
    if(index > -1){
      this.notWatchedItems.splice(index, 1);
      this._storage.set('notWatchedItems', this.notWatchedItems);
      this._storage.set('watchedItems', this.watchedItems);
      this.initializeWatchedItems;
      this.notWatchedItems;
    }
  }

  itemDelete(item){
    let index = this.watchedItems.indexOf(item);
    if(index > -1){
      this.watchedItems.splice(index, 1);
      this._storage.set('watchedItems', this.watchedItems);
      this.initializeWatchedItems;
    }
  }

  newItem(type){
    let modal = this.modalCtrl.create(NewItemPage, {type : type, mode : this.mode});    

    modal.onDidDismiss(item => {
      console.log(item);
        
      if (item != null){
        this.mode = item.option;

        if(this.mode == "watched"){
          this.watchedItems.push(item.data);
          this._storage.set('watchedItems', this.watchedItems)
          .then(data =>{
            console.log(data);
            this.initializeWatchedItems();
          }
          );
        }else{
          this.notWatchedItems.push(item.data);
          this._storage.set('notWatchedItems', this.notWatchedItems)          
          .then(data =>{
            console.log(data);
            this.initializeNotWatchedItems();
          }
          );
        }

        let toast = this.toastCtrl.create({
          message: 'new item added sucessfully!!! yoUR\'E AWESOME!!',
          duration: 1500,
          position: 'bottom'
          });
          toast.present();                       
      }
    });
    modal.present();
  };

}


  

