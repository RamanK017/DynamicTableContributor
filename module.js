angular.module("ngTable", ['ngMaterial', 'md.data.table'])
    .controller('ngTableCtrl', function(tableDataService) {

        var ctrl = this;
            
        ctrl.getUserData = function(pageno,pagelimit) {
            console.log("pageno", pageno,"limitttt",pagelimit);
            var promise = tableDataService.servicedata(pageno,pagelimit);
            promise.then(function(userobj) {
                ctrl.pageCount = userobj.pageCount;
                console.log("total count", ctrl.pageCount);
                ctrl.desserts = userobj.data;
                console.log(ctrl.desserts);
            });
            
        }
        
        ctrl.searchtab=function(text)
        {
            console.log("search text",text);
        }
        ctrl.deleteuser=function(id)
        {
            console.log("id deleted user",id);
        }
        
   
    });
