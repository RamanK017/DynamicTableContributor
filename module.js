angular.module("ngTable", ['ngMaterial', 'md.data.table'])
    .controller('ngTableCtrl', function(tableDataService) {

        var ngTablectrl = this;
//table information is a function which will fetch table data from service tableDataService
        ngTablectrl.tableinformation = function(pageno, pagelimit) {
            console.log("pageno", pageno, "limitttt", pagelimit);
            var promise = tableDataService.servicedata(pageno, pagelimit);
            promise.then(function(userobj) {
                ngTablectrl.pageCount = userobj.pageCount;
                console.log("total count", ngTablectrl.pageCount);
                ngTablectrl.tabledata = userobj.data;
                console.log(ngTablectrl.tabledata);
            });

        }
// searchinput is a function called from the child component which will show searched text
        ngTablectrl.searchinput = function(text) {
            console.log("search text", text);
        }
//tablerowid is a function called from the child component which will get the selected row id        
        ngTablectrl.tablerowid = function(id) {
            console.log("id deleted user", id);
        }
//tableheader is a function called from the child component which  will get the header value of the selected column in table.
        ngTablectrl.tableheader = function(key) {
            console.log("in parentctrl header", key);
        }

    });
