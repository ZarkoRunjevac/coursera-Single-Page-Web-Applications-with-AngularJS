(function(){

    'use strict';

    angular.module('LunchCheck',[])

    .controller('LunchCheckController', lunchCheck);

    lunchCheck.$inject=['$scope','$filter'];

    function lunchCheck($scope,$filter){

            $scope.lunch = "";
	        $scope.hasError = false;
	        $scope.errorMessage = null;
	        $scope.status_code = 0;
	        $scope.empty_items = 0;

            $scope.checkLunch=function(){
                reset();
                console.log(5+6);
                console.log($scope.lunch);
                if ($scope.lunch === undefined) {
			     return lunchError("Please enter data first!", true);
		        }

                var lunch = $scope.lunch.trim();
                if (lunch === '') {
                    return lunchError("Please enter data first!", true);
                }

                var contents = lunch.split(',');
                if (contents.length === 0) {
                    return lunchError("Please enter data first!", true);
                }

                var lunch_items = [];
                for (var i = 0; i < contents.length; i++) {
                    var item = contents[i].trim();
                    if (item.length > 0) {
                        lunch_items.push(item);
                    } else {
                        $scope.empty_items++;
                    }
                }

                if (lunch_items.length === 0) {
                    return lunchError("Please enter data first!", true);
                }

                if (lunch_items.length <= 3) {
                    $scope.status_code = 1;
                } else {
                    $scope.status_code = 2;
                }

                $scope.lunch = lunch_items.join(', ');

                return;
            };
            function lunchError(message, reset) {
                $scope.hasError = true;
                $scope.errorMessage = message;
                if (reset) {
                    $scope.lunch = '';
                }
                return;
	        }

            function reset() {
                $scope.hasError = false;
                $scope.errorMessage = null;
                $scope.status_code = 0;
                $scope.empty_items = 0;
            }
            
    }


    

})();