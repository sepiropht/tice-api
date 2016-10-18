import { Component } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
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
  constructor(public navCtrl: NavController, public stationCode: StationCode, public http: Http) {
    console.log('hello dans search');
    this.array = stationCode.data.map((item, index, arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (item.station === arr[i].station && item.ligne === arr[i].ligne && item.code) {
          return {
            station: item.station,
            ligne: item.ligne,
            codes: [item.code, arr[i].code]
          }
        }
      }
      //console.log(this.array);
    });
  }
  onClick(item) {

    this.http.post('http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/',{a:'recherche_code', code:item.codes[1]}).map(res => res.json()).subscribe(data => {
        console.log(data);
      });
  }

onInput(event) {
  let val = event.target.value.trim();
  if (val.length > 0) {
    this.results = this.array.filter(item => {
      return item.station.toLowerCase().indexOf(event.target.value) > -1 || val === item.ligne;
    })

  } else {
    this.results = [];
  }

  // if (this.results.length > 0) {
  //   console.log(this.results);
  // }

}
onCancel(event) {
  console.log(event.target.value);
}
}
