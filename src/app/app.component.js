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
('src/libs/js/Constellation-1.8.1.js');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        constellation.initializeClient('http://localhost:8088', '881863589a9ba4cf53a1d5e0d00d649e8cb1dca5', 'readOnly');
        constellation.onConnectionStateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connected) {
                console.log('connected');
                constellation.registerStateObjectLink("*", "ForecastIO", "Lille", "*", function (so) {
                    $scope.$apply(function () {
                        var maxPrev = 7;
                        $scope.meteoActuel = createDayliPrev(so.Value.currently);
                        $scope.listOfprevision = [];
                        for (var i = 0; i < maxPrev; i++) {
                            $scope.listOfprevision.push(createDayliPrev(so.Value.hourly.data[i]));
                        }
                    });
                });
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './weatherWidget.html',
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
function createDayliPrev(meteoActuSo) {
    return $scope.meteoActuel = {
        temperature: meteoActuSo.temperature,
        humidity: meteoActuSo.humidity,
        dewPoint: meteoActuSo.dewPoint,
        windSpeed: meteoActuSo.windSpeed,
        visibility: meteoActuSo.visibility,
        couldCover: meteoActuSo.couldCover,
        precipIntensity: meteoActuSo.precipIntensity,
        precipProbability: meteoActuSo.precipProbability,
        pressure: meteoActuSo.pressure,
        ozone: meteoActuSo.ozone,
        icon: meteoActuSo.icon,
        date: moment().format("DD/MM/YYYY"),
        heure: moment().format("HH:mm:ss"),
        summary: meteoActuSo.summary
    };
}
var HeroListComponent = (function () {
    function HeroListComponent(service) {
        this.service = service;
    }
    HeroListComponent.prototype.ngOnInit = function () {
        this.heroes = this.service.getHeroes();
    };
    HeroListComponent.prototype.selectHero = function (hero) { this.selectedHero = hero; };
    return HeroListComponent;
}());
exports.HeroListComponent = HeroListComponent;
//# sourceMappingURL=app.component.js.map