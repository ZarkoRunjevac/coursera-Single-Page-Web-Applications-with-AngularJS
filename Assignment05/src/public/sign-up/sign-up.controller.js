(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$http', 'ProfileService', 'DishService'];
function SignUpController($http, ProfileService,DishService) {
  var $ctrl = this;
  $ctrl.firstName = '';
  $ctrl.lastName = '';
  $ctrl.email = '';
  $ctrl.phone = '';
  $ctrl.favoriteDishNumber = '';
  $ctrl.favoriteDishError = false;
  $ctrl.saved = false;

  $ctrl.getFavoriteDish = function () {
    console.log('getFavoriteDish');

    var res=DishService.getFavoriteDish($ctrl.favoriteDishNumber);

    res.then(function (response) {
      console.log(response);
      if ( response.data.error != undefined  ) {
        $ctrl.favoriteDishError = true;
        $ctrl.saved =false;
      }
      else {
        $ctrl.favoriteDishError = false;
        console.log('from else');
        console.log(response);
        ProfileService.setUserProfile({
          firstName: $ctrl.firstName,
          lastName: $ctrl.lastName,
          email: $ctrl.email,
          phone: $ctrl.phone,
          favoriteDish: {
            number: $ctrl.favoriteDishNumber,
            name: response.data.name,
            description: response.data.description
          }
        });

        $ctrl.saved = true;
      }
    }).catch(function (error) {
      $ctrl.favoriteDishError = true;
      $ctrl.saved =false;
    });
  }

}


})();
