/*
* by PKatariya 28/06/16
* render product details.
*/

store.directive('productDetail',function(){
	return {
		restrict: 'E',
		scope:{
			products: '=',
			addToCart: '=',
			removeFromCart: '=',
			changeQuantity: '='
		},
		templateUrl: 'controller/directive/productDetailView.html'
	};
});