oaApp.directive('datagrid',function(dataService){
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope:{ aoColumns: '@',title:'@'},
        compile : function(element, attrs){
          //获取列显示名称及字段值
          var columns = JSON.parse(attrs.aocolumns);
          var replaceHtml = "";
          for(var i=0;i<columns.length;i++)
          {
            replaceHtml +="<td>{{row."+columns[i].field+"}}</td>"
          }
          //将模板内容替换 替换成显示的字段
          element[0].innerHTML = element[0].innerHTML.replace('<td>{rowContent}</td>',replaceHtml);
          return {link:function(scope, element, attrs){
            //将列属性添加到scope
            scope.aocolumns = JSON.parse(attrs.aocolumns);
          }};
        },
        controller: [ "$scope", function($scope) {
          //设置datagrid数据
        	$scope.data = [{id:1,name:"aa"},{id:2,name:"bb"}];
        }],
        template: '<div class="datagrid">'+
                    '<div class="m-widget">'+
                      '<header class="header">'+
                         '<h4 class="title">{{title}}</h4>'+
                      '</header>'+
                    '</div>'+
                    '<div class="content">'+
                       '<div class="panel panel-default">'+
                          '<table class="table">'+
                             '<thead>'+
                                '<tr>'+
                                   '<th ng-repeat="column in aocolumns">{{column.fieldName}}'+
                                   '</th>'+
                                '</tr>'+
                              '</thead>'+
                              '<tbody>'+
                                 '<tr ng-repeat="row in data">'+
                                 '<td>{rowContent}</td>'+
                                 '</tr>'+
                              '</tbody>'+
                          '</table>'+
                       '</div>'+
                     '</div>'+
                     '<div style="display:none" ng-transclude></div>'+
                   '</div>'
    }
});