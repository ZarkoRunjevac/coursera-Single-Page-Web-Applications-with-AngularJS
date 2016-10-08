(function(){
    'use strict';

    angular.module('Data')

    .service('MenuDataService', MenuDataService)

    .constant('ApiBasePath', " https://davids-restaurant.herokuapp.com");


    MenuDataService.$inject = ['$http', 'ApiBasePath'];

    function MenuDataService($http, ApiBasePath)
    {
        var service = this;

        service.getAllCategories= function (){
            //console.log('MenuDataService getAllCategories');
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });
    
            return (response.then(handleSuccess, handleError));
            
        };

        service.getItemsForCategory = function (categoryShortName) {
           
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params:{category : categoryShortName}
            });
            
       };

               
        function handleSuccess(reponse){
            return reponse.data;
        }
        
        function handleError( response ){
            console.log(error);
            return [];
        }
    };

})();