angular.module("ngTable", ['ngMaterial', 'md.data.table'])
    .controller('ngTableCtrl', function(tableDataService) {

        var ctrl = this;
            
        ctrl.getUserData = function(pageno) {
            console.log("pageno", pageno);
            var promise = tableDataService.servicedata(pageno);
            promise.then(function(userobj) {
                ctrl.pageCount = userobj.pageCount;
                console.log("total count", ctrl.pageCount);
                ctrl.desserts = userobj.data;
                console.log(ctrl.desserts);
            });
            /*ctrl.getUserstoreData(ctrl.desserts);*/
        }
        /*ctrl.getUserstoreData=function(saveData)
        {
            console.log("gggg",ctrl.saveData);
            ctrl.saveData=saveData;
            
        }*/
        
   
    });
