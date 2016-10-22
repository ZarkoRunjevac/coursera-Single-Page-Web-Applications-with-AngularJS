(function () {
  'use strict'
  angular.module('public')

  .service('DishService',DishService)

  .constant('ApiBasePath','https://thawing-escarpment-21432.herokuapp.com/');

  DishService.$inject = ['$http', 'ApiBasePath'];

  function DishService($http, ApiBasePath) {

    var service =this;

    service.getFavoriteDish = function (favoriteDishNumber) {
      console.log('DishService');
      var link=ApiBasePath+'menu_items/'+favoriteDishNumber+ '.json';
      return $http({
                method: "GET",
                url: (link)
            });

    };


  };


})();
