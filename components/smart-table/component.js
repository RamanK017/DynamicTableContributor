angular.module('ngTable').component('customTable', {
    templateUrl: 'components/smart-table/template.html',
    bindings: {
        userdata: '<',
        userinformation: '&',
        pagecount: '@'

    },
    controller: customTableCtrl,
    controllerAs: 'customTableCtrl'


});

function customTableCtrl() {

    var customTableCtrl = this;
    console.log(this);


    customTableCtrl.deselect = function(item) {
        console.log(item.name, 'was deselected');
    };
    customTableCtrl.log = function(item) {
        console.log(item.name, 'was selected');
    };
    customTableCtrl.options = {
        rowSelection: false,
        autoSelect: true,
        largeEditDialog: false,
        limitSelect: true,
        pageSelect: true
    };

    customTableCtrl.limitOptions = [5, 10, 15, {
        label: 'All',
        value: function() {
            return customTableCtrl.userdata ? customTableCtrl.pagecount : 0;
        }
    }];

    /* customTableCtrl.onPaginate = function(page, limit) {
       console.log('Scope Page: ' + customTableCtrl.query.page + ' Scope Limit: ' + customTableCtrl.query.limit);
       console.log('Page: ' + page + ' Limit: ' + limit);


       customTableCtrl.userinformation({'pageno':customTableCtrl.query.page});
     };*/

    customTableCtrl.toggleLimitOptions = function() {
        customTableCtrl.limitOptions = customTableCtrl.limitOptions ? undefined : [5, 10, 15];
    };
    customTableCtrl.selected = [];

    customTableCtrl.query = {
        order: 'name',
        limit: 5,
        page: 1
    };


    
    customTableCtrl.userinformation({ "pageno": 1 });
    customTableCtrl.onPaginate = function(pageno) {
        console.log(pageno);
        customTableCtrl.userinformation({ "pageno": pageno });

    }



}
