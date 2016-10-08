(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    //template: '<h1>My Contacts</h1>'
   templateUrl: 'src/menu/templates/main-categorieslist.template.html', 
    controller: 'MainCategoriesController as catList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        console.log('routes categories');
        return MenuDataService.getAllCategories();
        
      }]
    }
  })

  .state('categories.category-detail', {
    url: '/items/{short_name}',
    templateUrl: 'src/menu/templates/category-items.template.html',
    controller: "ItemsController as itemsCtrl",
    resolve: {
      categoryItems: ['MenuDataService','$stateParams', function(MenuDataService,$stateParams){
         console.log($stateParams.short_name);
         return MenuDataService.getItemsForCategory($stateParams.short_name);
         /*var promise=MenuDataService.getItemsForCategory($stateParams.short_name);

         promise.then(function(response){
           console.log(response);
           var menu_items= response.menu_items;
           console.log(menu_items);
           return menu_items;
         });*/
        /*promise.success(function(response){
           console.log('routes categories.items ');
           console.log(response);
           var menu_items= response.menu_items;
           if(menu_items){
              console.log(menu_items);
              console.log('routes categories.items after if ');
              return menu_items;
           }else{
             console.log('routes categories.items after else ');
           }
         });*/



        /* promise.then(function(response){
           console.log('routes categories.items ');

           var menu_items= response.data.menu_items;
           if(menu_items){
              console.log(menu_items);
              console.log('routes categories.items after if ');
              return menu_items;
           }else{
             console.log('routes categories.items after else ');
           }
         },function(response){
            console.log(response);
         });*/
         
      }]
    }
  });

}

})();
