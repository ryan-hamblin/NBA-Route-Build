var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	// This will add a new game
	this.addNewGame = function(gameObj){
		var url = "https://api.parse.com/1/classes/" + gameObj.homeTeam;
		var deffered = $q.defer();
		if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)){
			gameObj.won = true;
		}else if(parseInt(gameObj.homeTeamScore) <= parseInt(gameObj.opponentScore)){
			gameObj.won = false;
		};
		$http.post({
				url: url,
				data: gameObj
		}).then(function(response1){
			deffered.resolve(response1);
		});
		return deffered.promise;
	};



// end service.
});