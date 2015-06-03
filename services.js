oaApp.factory('dataService',function($resource){
	function pageSelect(params)
	{
		return $resource('pageSelect.do', {}, {
	        query: {method:'GET', params:params, isArray:false}
	      });
	}

	return {
		pageSelect : pageSelect
	};
});
/*oaApp.factory('dataService',function($http){
	function pageSelect(params)
	{
		var result;
		$http.get('pageSelect.do',params).success(function(data) {
           result = data;
        });
		return result;
	}

	return {
		pageSelect : pageSelect
	};
});*/