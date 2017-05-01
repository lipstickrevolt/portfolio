angular.module("myApp")


.factory("draggableData", function(){
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
.controller("gameController", ["$scope", "draggableData", function($scope, draggableData){


    $scope.alldata = draggableData;
}])

.directive("dragme", ["$timeout", function($timeout){
    return{
        restrict: "A",
        replace: true,
        link: function($scope, $elem, $attr){
            var backgroundImage = $attr.backgroundimage;
            var answerData = $attr.answerData;
            var myBgcolor = $attr.bgcolor;
            var myLeft = parseInt($attr.left);

            $elem.addClass("draggable");
            $elem.attr("data-answerimage", backgroundImage);
            $elem.attr("data-answerdata", answerData);
            $elem.attr("data-myindex", $scope.myindex);
            $elem.css({
                left:myLeft,
                backgroundImage: "url(img/" + backgroundImage + ")"
            });
            console.log($elem);
            $elem.draggable({
                helper: "clone",
                revert: true,
                appendTo: "body",
                zIndex: 100,
                drag: function(event, ui){
                    $(ui.helper).css("border", "0px")
            }
            })

        }

    }

}])
