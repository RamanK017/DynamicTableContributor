angular.module('ngTable').component('customTable', {
    templateUrl: 'components/smart-table/template.html',
    transclude: {
        topCorner: 'topCorner',
        rowCorner: 'rowCorner'
    },
    bindings: {
        tabledata: '<',
        tableinformation: '&',
        pagecount: '@',
        searchinput: '&',
        tablerowid: '&',
        tableheader: '&',
        sortflags: '<'

    },
    controller: customTableCtrl,
    controllerAs: 'customTableCtrl'


});

function customTableCtrl() {

    var customTableCtrl = this;
    console.log(this);

    customTableCtrl.sortFields=function(){
        console.log("sortField function is called",customTableCtrl.sortflags);
    }
    // headervalue is a function which passed the respective header 
    customTableCtrl.headervalue = function(header) {
            var sortOrder;
            if(customTableCtrl.sortflags[header].ascending===false && customTableCtrl.sortflags[header].descending===false)
            {
                customTableCtrl.sortflags[header].ascending=true;
                sortOrder="ascending";
            }
            else {

                customTableCtrl.sortflags[header].ascending=!customTableCtrl.sortflags[header].ascending;
                customTableCtrl.sortflags[header].descending=!customTableCtrl.sortflags[header].descending;
                if(customTableCtrl.sortflags[header].ascending === true){
                    sortOrder="ascending";
                }
                else{
                    sortOrder="descending";
                }
            }
            if(customTableCtrl.currentSortHeader !== undefined && customTableCtrl.currentSortHeader !== header ){
                customTableCtrl.sortflags[customTableCtrl.currentSortHeader].ascending=false;
                customTableCtrl.sortflags[customTableCtrl.currentSortHeader].descending=false;

            }
            customTableCtrl.currentSortHeader=header;

            customTableCtrl.tableheader({ 'key': header, 'sortOrder': sortOrder}); // calling the parent tableheader() function by passing the header of table 


        }
        // searchopentab is a function that will hide the main toolbar
    customTableCtrl.serchopentab = function() {
        customTableCtrl.options.Search = true;
        customTableCtrl.options.rowSelection = false;
    }
    customTableCtrl.options = {
        rowSelection: false,
        pageSelect: true,
        Search: false,
        deletenavbar: true,
    };

    customTableCtrl.selected = [];

    customTableCtrl.query = {
        order: 'name',
        limit: 5,
        page: 1
    };
    // tablerow is a function passing the respective id of a particular row 
    customTableCtrl.tablerow = function(tableobj) {
            customTableCtrl.deletenavbar = true;
            customTableCtrl.options.rowSelection = true;
            console.log(tableobj._id);
            customTableCtrl.id = tableobj._id;
        }
        //   seclectedRowId is a function passing the respective id of a particular row 
    customTableCtrl.seclectedRowId = function() {

        customTableCtrl.tablerowid({ 'id': customTableCtrl.id });
    }

    //tableinformation is user for first time loading the table data
    customTableCtrl.tableinformation({ "pageno": 0, 'pagelimit': 5 });
    customTableCtrl.onPaginate = function(pageno, pagelimit) {
        //onPaginate is a function that iterate on the no of pages as well as calling the parent tableinformation function  
        customTableCtrl.tableinformation({ "pageno": pageno, 'pagelimit': pagelimit });

    }

}
