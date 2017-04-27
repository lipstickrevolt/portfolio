angular.module("myApp", ["ngRoute"])

    .config(["$routeProvider", function($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.html",
                controller: "homeController"
            })
            .otherwise({
                redirectTo: "/home"
            });

    }]);