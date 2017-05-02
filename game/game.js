angular.module("myApp")


    .factory("draggableData", function () {
        var data = [
            {
                objectname: "Hopeful Heart Bear",
                objectimg: "/Hopefulheartbear.gif"
            },
            {
                objectname: "Friend Bear",
                objectimg: "/FriendBear.gif"
            },
            {
                objectname: "Cheer Bear",
                objectimg: "/cheerbear.png"
            },
            {
                objectname: "Baby Tugs Bear",
                objectimg: "/tugs.gif"
            },
            {
                objectname: "Bashful Heart Bear",
                objectimg: "/Greencare.gif"
            },
            {
                objectname: "Always There Bear",
                objectimg: "/Always_There_bear.gif"
            }
        ];

        return data;

    })

    .factory("droppableData", function () {
        var data = [
            {
                objectname: "Hopeful Heart Bear",
                objectimg: "/HopefulHeartbkgrd.png"
            },
            {
                objectname: "Friend Bear",
                objectimg: "/FriendBearBkgrnd.png"
            },
            {
                objectname: "Cheer Bear",
                objectimg: "/cheerbearbkgrd.png"
            },
            {
                objectname: "Baby Tugs Bear",
                objectimg: "/tugsbkgrd.png"
            },
            {
                objectname: "Bashful Heart Bear",
                objectimg: "/GreencareBkgrd.png"
            },
            {
                objectname: "Always There Bear",
                objectimg: "/alwaystherebkgrd.png"
            }
        ];

        return data;
    })
    .controller("gameController", ["$scope", "draggableData", "droppableData", "$timeout", function ($scope, draggableData, droppableData, $timeout) {


        $scope.dragableArray = draggableData;
        $scope.droppableArray = droppableData;

        //shuffle the array for randomness
        $scope.dragableArray = _.shuffle($scope.dragableArray);
        $scope.droppableArray = _.shuffle($scope.droppableArray);

        $scope.spongeBobStatus = "sleeping";
        $scope.setSpongebobStatus = function (value) {
            console.log(value);
            $scope.$apply(function () {
                $scope.spongeBobStatus = value;
            })
        }


        $scope.score = 0;
        $scope.setScore = function (value) {
            $scope.$apply(function () {
                $scope.score = $scope.score + value;
                console.log("new score", $scope.score);
            })

        };
        $scope.$watch(function () {
            return $scope.score;
        }, function (newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal === $scope.droppableArray.length) {
                    console.log("game over");
                    $timeout(function () {
                        $scope.spongeBobStatus = "finish";
                    }, 500)

                }
            }
        })
        $scope.removeFromArray = function (value) {
            console.log(value);
            angular.forEach($scope.dragableArray, function (arrvalue, arrindex) {
                var objectname = arrvalue.objectname;
                if (objectname == value) {
                    $scope.matchedIndex = arrindex;
                    console.log(arrindex);
                }
            });
            $scope.$apply(function () {
                $scope.dragableArray.splice($scope.matchedIndex, 1);
            })
        }
    }])

    .directive("dragme", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            replace: true,
            scope: {
                myindex: "@",
                setSpongebob: "&"
            },
            link: function ($scope, $elem, $attr) {
                var backgroundImage = $attr.backgroundimage;
                var answerData = $attr.answerData;
                var myBgcolor = $attr.bgcolor;
                var myLeft = parseInt($attr.left);

                $elem.addClass("draggable");
                $elem.attr("data-answerimage", backgroundImage);
                $elem.attr("data-answerdata", answerData);
                $elem.attr("data-myindex", $scope.myindex);
                $elem.css({
                    left: myLeft,
                    backgroundImage: "url(img/" + backgroundImage + ")"
                });
                // console.log($elem);

                $elem.draggable({
                    helper: "clone",
                    revert: true,
                    appendTo: ".outerContainer",
                    zIndex: 100,
                    drag: function (event, ui) {
                        $(ui.helper).css("border", "0px");
                        $scope.setSpongebob({
                            value: "dragging"
                        })
                    }
                });

            }

        }

    }])

    .directive("dropme", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            replace: true,
            scope: {
                setScore: "&",
                removeArray: "&",
                setSpongebob: "&"
            },
            link: function ($scope, $elem, $attr) {
                var backgroundImage = $attr.backgroundimage;
                var answerData = $attr.objectname;
                $elem.addClass("droppable");
                $elem.attr("data-answerimage", backgroundImage);
                $elem.attr("data-answerdata", answerData);
                $elem.css({
                    backgroundImage: "url(img/" + backgroundImage + ")"
                });
                $elem.droppable({
                    accept: ".draggable",
                    drop: function (event, ui) {
                        var droppedElem = ui.draggable;
                        var myAnswer = $(this).attr("data-answerdata");
                        var droppedSit = $(droppedElem).attr("answerdata");
                        console.log(droppedSit);
                        console.log(myAnswer);
                        if (droppedSit === myAnswer) {
                            $(this).css("background-image", "url(img/" + droppedElem.attr("backgroundimage") + ")");
                            $(this).attr("data-isanswered", "yes");
                            $scope.setScore({value: 1});
                            $scope.removeArray({
                                value: $(droppedElem).attr("answerdata")
                            });
                            $scope.setSpongebob({
                                value: "happy"
                            })

                        } else {
                            $(this).effect("shake");
                            $scope.setSpongebob({
                                value: "tease"
                            })
                        }

                    }
                })
            }
        }

    }])