(function () {

    'use strict';

    angular.module('MenuApp')

    .controller('ItemsController',ItemsController);

    

    ItemsController.$inject = ['categoryItems','$stateParams'];
    function ItemsController(categoryItems,$stateParams) {
        var itemsCtrl = this;

        itemsCtrl.categoryItems = categoryItems.data.menu_items;
        console.log(itemsCtrl.categoryItems);
    }
})();