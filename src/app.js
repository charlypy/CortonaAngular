
var AngularCortona = angular.module('AngularCortona', ['ngConstellation']);
AngularCortona.controller('MyController', ['$scope', 'constellationConsumer', function ($scope, constellation) {

	constellation.initializeClient("http://localhost:8088", "881863589a9ba4cf53a1d5e0d00d649e8cb1dca5", "readOnly");
	constellation.onConnectionStateChanged(function (change) {
		if (change.newState === $.signalR.connectionState.connected) {
			console.log("connected");

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
		}
	}

	constellation.connect();


}]);