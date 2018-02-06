angular.module('SongCtrl', []).controller('SongController', function($scope, SongService) {

	$scope.formSongData;
	$scope.songs;

 	SongService.get().then(function(res) {
 		$scope.songs = res.data;
 	});

 	$scope.createSong = function(data) {
 		var newSong = {
 			title: $scope.formSongData.title,
 			artist: $scope.formSongData.artist,
 			bpm: $scope.formSongData.bpm,
 			key: $scope.formSongData.key
 		}
 		SongService.create(newSong).then(function(res) {
 			$scope.songs = res.data;
 			$scope.formSongData = {};
 			console.log("Song created!");
 	})};

 	$scope.deleteSong = function(songid) {
 		SongService.delete(songid).then(function(res) {
 			$scope.songs = res.data;
 			console.log("Song deleted!");
 	})};


	console.log($scope.songs);

});