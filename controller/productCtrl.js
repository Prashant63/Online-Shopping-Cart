store.controller("shoppingKart",["$scope", "productDetailService", "storageService", "cart",
								 function($scope, productDetailService, storageService, cart){

		$scope.addToCart = function(product){
			cart.addItem(product.id)
		}

		$scope.changeQuantity = function(product,offSet){
			cart.changeQuantity(product.id,offSet)
		}

		$scope.clearCart = function(){
			cart.clear()
		}

		$scope.removeFromCart = function(product){
			cart.remove(product.id);
		}


		$scope.paginate = function(){
			if($scope.products != null && $scope.products.productInfo != null){
				$scope.productsPerPage = $scope.products.productInfo.slice($scope.offset, $scope.offset + $scope.perPage);
			}
		};

		$scope.previous = function(){
			$scope.offset = $scope.offset - $scope.perPage;
		};

		$scope.next = function(){
			$scope.offset = $scope.offset + $scope.perPage;
		};

		$scope.$watch('offset', function(){
			$scope.paginate();
		});

		var init = function(){
			$scope.products = [];
			$scope.allProduct = 0;
			$scope.perPage = 8;
			$scope.offset = 0;
			productDetailService.get().then(function (data){
				$scope.products = data.data;
				$scope.allProduct = $scope.products.productInfo.length;
				setCartDetails();
				$scope.paginate();
			});
		}

		var updateProdCartQuantity = function(){
			for(var i = 0; i < $scope.products.productInfo.length; i++){
				product = $scope.products.productInfo[i];
				if($scope.myCart.hasOwnProperty(product.id)){
					product.cartQuantity = $scope.myCart[product.id];
				}
				else{
					product.cartQuantity = 0;
				}
			}
		}

		var getProduct = function(id, count){
			var product = null;
			for(var i = 0; i < $scope.products.productInfo.length; i++){
				product = $scope.products.productInfo[i];
				if(product.id == id){
					return product;
				}
			}
			return product;
		}

		var setCartDetails = function(){	
			$scope.myCart = cart.getMyCart();
			$scope.totalCartItems = Object.getOwnPropertyNames($scope.myCart).length;
			$scope.myCartProducts = [];
			$scope.totalCartPrice = 0;
			$scope.showCart = $scope.totalCartItems > 0;

			for(var key in $scope.myCart){
					var myCartProduct = {};
					var product = getProduct(key, $scope.myCart[key]);
					if(product != null){
						myCartProduct.name = product.prodName;
						myCartProduct.count = $scope.myCart[key];
						myCartProduct.price = myCartProduct.count * product.price

						$scope.myCartProducts.push(myCartProduct);
						$scope.totalCartPrice += myCartProduct.price;
					}
				}
				updateProdCartQuantity();
				if($scope.showCart){
					document.getElementById('menu').style.width = "75%";
				}
		}

		$scope.$on('cartUpdated',function(){
			setCartDetails();
			$scope.paginate();
		})
		
		init();
}]);