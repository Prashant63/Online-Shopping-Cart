store.factory('productDetailService',function($http){
	return {
		get: function(){
			return $http.get('json/product.json');
		}
	};
});

