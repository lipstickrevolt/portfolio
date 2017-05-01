angular.module("myApp", ["ngRoute"])

    .config(["$routeProvider", function($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.html",
                controller: "homeController"
            })
            .when("/skills", {
                templateUrl: "skills/skills.html",
                controller: "skillsController"
            })
            .when("/game", {
                templateUrl: "game/game.html",
                controller: "gameController"
            })
            .otherwise({
                redirectTo: "/home"
            });

    }]);