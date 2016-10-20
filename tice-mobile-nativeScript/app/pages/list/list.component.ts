
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import StationCode from '../../shared/StationCode';

@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers: [StationCode]
})
export class ListComponent implements OnInit {
  public groceryList;
  public results;
  constructor(public stationCode : StationCode) {

  }
  ngOnInit() {
     this.groceryList = this.stationCode.data
  }
  onChange(event) {
    let val = event.value.trim()
    if (val.length > 0) {
      this.results = this.groceryList.filter(item => {
        return item.station.toLowerCase().indexOf(event.value) > -1 || val === item.ligne;
      })

    } else {
      this.results = [];
    }
  }
}
