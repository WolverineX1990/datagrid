oaApp.filter('dataFilter',function(){
    return function(item,num){
        for(var i = 0;i < num;i++){
            item = item + '!';
        }
        return item;
    }
});