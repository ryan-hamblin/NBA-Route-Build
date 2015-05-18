var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	// This will add a new game
	this.addNewGame = function(gameObj){
		var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
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

	//This will fetch data for specific teams and update wins and losses.
	this.getTeamData = function(team){
		var deffered = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team;
		$http.get({
			url: url
		}).then(function(data){
			var results = data.data.results;
			console.log(results);
			var wins = 0;
			var losses = 0;
			for (var i = 0; i < results.length; i++) {
				if(results[i].won === true) {
					wins++
				}
				else if(results[i].won === false){
					losses++
				}
			};
			results.wins = wins;
			results.losses - losses;
			deffered.resolve(results);
		});
		return deffered.promise;
	};


// end service.
});