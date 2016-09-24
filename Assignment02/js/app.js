(function(){

    'use strict';

    angular.module('ShoppingListCheckOff',[])

    .controller('ToBuyShoppingController', ToBuyShoppingController)
    
    .controller('AlreadyboughtListShoppingController', AlreadyboughtListShoppingController)
    
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);  

    ToBuyShoppingController.$inject=['ShoppingListCheckOffService'];

    function ToBuyShoppingController(ShoppingListCheckOffService){
        var controller=this;

        controller.list=ShoppingListCheckOffService.getShoppingList();

        controller.item=function(index){
            try{
                ShoppingListCheckOffService.purItem(index);
            }catch(err){
                alert(err);
            }
        };
    }

    AlreadyboughtListShoppingController.$inject=['ShoppingListCheckOffService'];

    function AlreadyboughtListShoppingController(ShoppingListCheckOffService){
        var controller=this;
        controller.list=ShoppingListCheckOffService.getPurchasedList();
    }


    function ShoppingListCheckOffService(){
        var service=this;


        var toBuyList=[
            {
			name: 'cookies',
			quantity: 3
		},
		{
			name: 'books',
			quantity: 4
		},
		{
			name: 'tablets',
			quantity: 1
		},
		{
			name: 'smartphones',
			quantity: 5
		},
		{
			name: 'laptops',
			quantity: 3
		}
        ];

        var boughtList=[];

        service.getShoppingList=function(){
            return toBuyList;
        };
        service.getPurchasedList=function(){
            return boughtList;
        };

        service.purItem=function (index) {

            if(typeof toBuyList[index]===undefined){
                return new Error("Couldn't find item in list!",index);
            }
            
            var item=toBuyList.splice(index,1);

            if(typeof item[0]===undefined){
                return new Error('Error',index);
            }

            boughtList.push(item[0]);

            return;

        };
    }

})();