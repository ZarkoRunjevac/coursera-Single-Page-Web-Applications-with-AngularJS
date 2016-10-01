(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)

.service('MenuSearchService', MenuSearchService)

.directive("foundItems",FoundItemsDirective)

.constant('ApiBasePath', " https://davids-restaurant.herokuapp.com");

function FoundItemsDirective(){
  var ddo={
    templateUrl: 'templates/foundList.html',
    scope: {
      items: '<',
      onRemove: '&',
      hasError:'=',
      errorMessage:'='
    },
    controller: FoundListDirectiveController,
    controllerAs: 'list',
    bindToController: true    
  };

  return ddo;
}


function FoundListDirectiveController(){
  var list=this;
  
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController( MenuSearchService) {
  
  var controller=this;

  controller.hasError = false;
  controller.errorMessage = null;
  controller.searchTerm="";
  controller.found=[];

  
  controller.narrow=function(){
    
      controller.reset();
      
      if(controller.searchTerm===""){
        controller.hasError=true;
        controller.errorMessage="You entered empty string!";
        
        
      } else{
        MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function(items){
        if(0===items.length){
          controller.hasError=true;
          controller.errorMessage="Nothing found!";        
        }
        controller.found=items;     
      });
     }
  };
  controller.reset=function(){
    controller.found=[];
    controller.hasError = false;
    controller.errorMessage = null;
  };
  controller.removeItem=function(index){
    
    if(typeof controller.found[index]===undefined){
       return new Error("Couldn't find item in list!",index);
    }
    controller.found.splice(index,1);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function  MenuSearchService($http, ApiBasePath) {
  var service = this;
  var _searchTerm="";
  var foundItems=[];
  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    _searchTerm=searchTerm;
    return (response.then(handleSuccess, handleError));
    
  };

  function handleSuccess( response ) {
     foundItems=[];
     var menu_items=response.data.menu_items;
     console.log(menu_items);
      
      console.log("Retrived items length="+menu_items.length);
      for(var index=0;index<menu_items.length;++index){
        var description=menu_items[index].description;
        
        if(description.toLowerCase().indexOf(_searchTerm)!==-1){
          foundItems.push(menu_items[index]);
        }
      }

      return foundItems;
    }
      
   function handleError( response ) {
     foundItems=[];
     
     return foundItems;

   }
}

})();
