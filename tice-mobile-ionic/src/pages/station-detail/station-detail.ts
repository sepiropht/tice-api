import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the StationDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-station-detail',
  templateUrl: 'station-detail.html'
})
export class StationDetail {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('Hello StationDetail Page');
     this.item = this.navParams.get('item');
  }

}
