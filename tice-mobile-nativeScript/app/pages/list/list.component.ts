
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import StationCode from '../../shared/StationCode';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
    selector: "list",
    templateUrl: "pages/list/list.html",
    styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
    providers: [StationCode]
})
export class ListComponent implements OnInit {
    public groceryList;
    public results;
    constructor(public stationCode: StationCode, public http: Http) {

    }
    ngOnInit() {
        this.groceryList = this.stationCode.data
    }
    onTap(item) {
        for (let key in item) {
            console.log(item[key], key)
        }
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        this.http.post('http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/',
        JSON.stringify({ a: 'refresh', ran: item.ran, refs: item.refs }),
        {  headers:headers})
            .map(res => console.log(res))
            .catch(error => {// In a real world app, we might use a remote logging infrastructure
                // We'd alorso dig deeper into the error to get a better message
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg); // log to console instead
                return Observable.throw(errMsg);
            });
        console.log('http');
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
