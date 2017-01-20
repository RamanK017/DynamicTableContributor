angular.module('ngTable').component('customTable', {
    templateUrl: 'components/smart-table/template.html',
    bindings: {
        userdata: '<',
        userinformation: '&',
        pagecount: '@',
        searchtab: '&',
        deleteid: '&'

    },
    controller: customTableCtrl,
    controllerAs: 'customTableCtrl'


});

function customTableCtrl() {

    var customTableCtrl = this;
    console.log(this);

    customTableCtrl.serchopentab = function() {
        customTableCtrl.options.Search = true;
        customTableCtrl.options.rowSelection = false;
    }
    customTableCtrl.options = {
        rowSelection: false,
        pageSelect: true,
        Search: false
    };

    customTableCtrl.selected = [];

    customTableCtrl.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    customTableCtrl.callerfun = function(userdataobj) {
        console.log(userdataobj.name);
        customTableCtrl.username = userdataobj.name;
    
    }
    customTableCtrl.userdelete = function() {

        customTableCtrl.deleteid({ 'id': customTableCtrl.username });
    }

    
    customTableCtrl.userinformation({ "pageno": 0, 'pagelimit': 5 });
    customTableCtrl.onPaginate = function(pageno, pagelimit) {
        console.log(pageno);
        customTableCtrl.userinformation({ "pageno": pageno, 'pagelimit': pagelimit });

    }



}
