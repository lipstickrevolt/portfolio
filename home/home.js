angular.module("myApp")


.controller("homeController", ["$scope", "$timeout", function($scope, $timeout){
        $scope.test = "this is a test";


        $scope.clock = "loading clock..."; // initialise the time variable
        $scope.tickInterval = 1000 //ms

        var tick = function() {
            $scope.clock = Date.now() // get the current time
            $timeout(tick, $scope.tickInterval); // reset the timer
        }

        // Start the timer
        $timeout(tick, $scope.tickInterval);

}])