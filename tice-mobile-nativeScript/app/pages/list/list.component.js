"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var StationCode_1 = require('../../shared/StationCode');
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var ListComponent = (function () {
    function ListComponent(stationCode, http) {
        this.stationCode = stationCode;
        this.http = http;
    }
    ListComponent.prototype.ngOnInit = function () {
        this.groceryList = this.stationCode.data;
    };
    ListComponent.prototype.onTap = function (item) {
        for (var key in item) {
            console.log(item[key], key);
        }
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        this.http.post('http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/', JSON.stringify({ a: 'refresh', ran: item.ran, refs: item.refs }), { headers: headers })
            .map(function (res) { return console.log(res); })
            .catch(function (error) {
            // We'd alorso dig deeper into the error to get a better message
            var errMsg = (error.message) ? error.message :
                error.status ? error.status + " - " + error.statusText : 'Server error';
            console.error(errMsg); // log to console instead
            return Rx_1.Observable.throw(errMsg);
        });
        console.log('http');
    };
    ListComponent.prototype.onChange = function (event) {
        var val = event.value.trim();
        if (val.length > 0) {
            this.results = this.groceryList.filter(function (item) {
                return item.station.toLowerCase().indexOf(event.value) > -1 || val === item.ligne;
            });
        }
        else {
            this.results = [];
        }
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            templateUrl: "pages/list/list.html",
            styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
            providers: [StationCode_1.default]
        }), 
        __metadata('design:paramtypes', [StationCode_1.default, http_1.Http])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBQ3pFLDRCQUF3QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ25ELHFCQUF3QyxlQUFlLENBQUMsQ0FBQTtBQUN4RCxtQkFBMkIsU0FBUyxDQUFDLENBQUE7QUFDckMsUUFBTyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzlCLFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQVEvQjtJQUdJLHVCQUFtQixXQUF3QixFQUFTLElBQVU7UUFBM0MsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO0lBRTlELENBQUM7SUFDRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtJQUM1QyxDQUFDO0lBQ0QsNkJBQUssR0FBTCxVQUFNLElBQUk7UUFDTixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQy9CLENBQUM7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUVBQXVFLEVBQ3RGLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDaEUsRUFBRyxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUM7YUFDZixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDO2FBQzVCLEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDUixnRUFBZ0U7WUFDaEUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU87Z0JBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sV0FBTSxLQUFLLENBQUMsVUFBWSxHQUFHLGNBQWMsQ0FBQztZQUM1RSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMseUJBQXlCO1lBQ2hELE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsZ0NBQVEsR0FBUixVQUFTLEtBQUs7UUFDVixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSTtnQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0RixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDTCxDQUFDO0lBN0NMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLEVBQUUscUJBQXFCLENBQUM7WUFDaEUsU0FBUyxFQUFFLENBQUMscUJBQVcsQ0FBQztTQUMzQixDQUFDOztxQkFBQTtJQXlDRixvQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1kscUJBQWEsZ0JBd0N6QixDQUFBIn0=