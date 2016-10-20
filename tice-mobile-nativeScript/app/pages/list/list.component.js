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
var ListComponent = (function () {
    function ListComponent(stationCode) {
        this.stationCode = stationCode;
    }
    ListComponent.prototype.ngOnInit = function () {
        this.groceryList = this.stationCode.data;
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
        __metadata('design:paramtypes', [StationCode_1.default])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBQ3pFLDRCQUF3QiwwQkFBMEIsQ0FBQyxDQUFBO0FBUW5EO0lBR0UsdUJBQW1CLFdBQXlCO1FBQXpCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO0lBRTVDLENBQUM7SUFDRCxnQ0FBUSxHQUFSO1FBQ0csSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtJQUMzQyxDQUFDO0lBQ0QsZ0NBQVEsR0FBUixVQUFTLEtBQUs7UUFDWixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSTtnQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQTtRQUVKLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDSCxDQUFDO0lBekJIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLEVBQUUscUJBQXFCLENBQUM7WUFDaEUsU0FBUyxFQUFFLENBQUMscUJBQVcsQ0FBQztTQUN6QixDQUFDOztxQkFBQTtJQXFCRixvQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlkscUJBQWEsZ0JBb0J6QixDQUFBIn0=