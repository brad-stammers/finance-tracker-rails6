var app = angular.module('FinanceTrackerApp', [])
                 .factory('stockService', ['$http', function($http){
                   var stockApi = {};
                   stockApi.searchStocks = function(symbol){
                     return $http.get('/search_stocks.json?stock=' = symbol)
                   }
                   stockApi.adStockToPortfolio = function(symbol){
                     return $http.post('/user_stocks.json?stock=' + symbol);
                   }
                   return stockApi;
                 }])
                 .controller("stocksController", ['$scope', 'stockService', function($scope, stockService){

                   $scope.stock = {};


                   $scope.lookup = function(){

                     if($scope.ticker != undefined && $scope.ticker != ""){
                       stockService.searchStocks($scope.ticker)
                        .then(function(response){
                                $scope.stock.error = null;
                                $scope.stock.message = null;
                                $scope.stock.symbol = response.data.ticker;
                                $scope.stock.name = response.data.name;
                                $scope.stock.last_price = response.data.last_price;
                                $scope.stockcan_be_added = response.data.can_be_added;
                              },
                              function(response){
                                $scope.stock = {};
                                $scope.stock.message = null;
                                $scope.stock.error = response.data.response;
                              });

                     } else {
                        $scope.stock = {}
                     }
                   }

                   $scope.add = function(){
                     if($scope.stock != undefined && $scope.stock.symbol != ''){
                       stockService.addStockToPortfolio($scope.stock.symbol)
                        .then(function(response){
                          $scope.stock.error = null;
                          $scope.stock.message = response.data.response;
                          $scope.stock.name = null;
                          $scope.stock.ticker = null;
                          $('#stock-list').load('my_portfolio.js');
                        },
                        function(response){
                          $scope.stock = {};
                          $scope.stock.message = null;
                          $scope.stock.error = response.data.response;
                        });
                     } else {
                       $scope.stock.error = "Stock cannot be added";
                     }
                   }
                 }])
                 .factory('friendService', ['$http', function($http){
                   var friendApi = {};
                   friendApi.searchFriends = function(search_param){
                     return $http('/search_friends.json?search_param=' + search_param);
                   }
                   friendApi.addFreiend = function(id) {
                     return $http.post('/add_friend.json?friend=' + id);
                   }
                   return friendApi;
                 }])
                 .controller('friendsController', ['$scope', 'friendService', function($scope,friendService){
                   $scope.friends = {};

                   $scope.lookup = function(){
                     if($scope.friend-search-param != undefined && $scope.friend-search-param != ''){
                       friendService.searchFriends($scope.friend-search-param)
                        .then(function(response){
                          $scope.friends.error = null;
                          $scope.friends.message = null;
                          $scope.friends.list = response.data;
                        },
                        function(response){
                          $scope.friends = {};
                          $scope.friends.error = response.data.response;
                        });
                     } else {
                       $scope.friends = {};
                     }
                   }

                   $scope.add = function(friend_id){
                     $scope.friends = {};

                     if (friend_id != undefined && friend_id != ''){
                       friendService.addFriend(friend_id)
                        .then(function(response){
                          $scope.friends.error = null;
                          $scope.friends.message = response.data.response;
                          $scope.friend_search_param = null;
                          $('#friends-list').load('my_friends.js');
                        },
                        function(response){
                          $scope.friends.error = response.data.response;
                        })
                     } else {
                       $scope.friends.error = "Friend cannot be added";
                     }
                   }
                 }])
