/*
* by PKatariya 28/06/16
* render cart details
*/

store.directive('storeCart',function(){
	return {
		restrict: 'E',
		scope:{
			myCartProducts: '=',
			totalCartPrice: '=',
			totalCartItems: '='
		},
		link: function(scope){
			console.log(scope)
		},
		templateUrl: 'controller/directive/storeCartView.html'
	};
});