store.service("cart", ['$rootScope', 'Reviewer', 'storageService',
 function ($rootScope, Reviewer, storageService) {
 		var myCart = {};
        var self = this;

 		self.getMyCart = function(){
 			return myCart;
 		}

        var getCart = function(){
        	myCart = storageService.get({
        		key: 'cart',
        		type: 'json'
        	});
            if(myCart == null){
                myCart = {};
            }
        };

        self.addItem = function(itemId){
        	myCart[itemId] = 1;
        	save(myCart);
        };

        var addItems = function() {

        };

        var save = function() {
        	if(Reviewer.review(myCart)){
        		persist();
        	}
        };

        self.remove = function (itemId) {
        	delete myCart[itemId];
        	save();
        };

        self.clear = function() {
        	myCart = {};
        	save();
        };

        var persist = function() {
        	storageService.set({
        		key : 'cart',
        		data : myCart
        	});
        	refresh();
        };

        self.changeQuantity = function (itemId, offSet){
            if(myCart[itemId] == 1 && offSet == -1){
                self.remove(itemId);
            }else{
                myCart[itemId] = myCart[itemId] + offSet;
            }
        	save();
        };

        var refresh = function() {
        	$rootScope.$broadcast('cartUpdated');
        };

        getCart();
    }]);