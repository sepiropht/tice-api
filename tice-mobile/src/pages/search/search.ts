import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {StationCode} from '../../service/stationCode';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public placeholder = 'Votre recherche';
  private array;
  public results;
  constructor(public navCtrl: NavController, public stationCode: StationCode) {
    console.log('hello dans search');
    this.array = stationCode.data;
    console.log(this.array);
  }
  onInput(event) {
    let val = event.target.value.trim();
    if (val.length > 0) {
      this.results = this.array.filter(item => {
        return item.station.toLowerCase().indexOf(event.target.value) > -1;
      })
    } else {
      this.results = [];
    }

  }
  onCancel(event) {
    console.log(event.target.value);
  }
}
