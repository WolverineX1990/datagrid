/**
 * 这里是
 * @type {[type]}
 */
//var useCarModule = angular.module("useCarModule", ['usecarServices']);

oaApp.controller('usecarCrl', function($scope, dataService) {
	 /*$scope.usecars = dataService.pageSelect({
	 	                            tablename:'oa_usecar',
	 	                            activitiKey:'usecar',
	 	                            whereString:"1=1",
	 	                            orderByString:"id desc",
	 	                            pageIndex:0,
	 	                            pageSize:10}).query();*/
});

oaApp.controller('test1Ctrl', function($scope, $http) {
  $scope.ttt='aaaa';
  $scope.$on('$locationChangeStart',function(){
      $templateCache.removeAll();
  });
});