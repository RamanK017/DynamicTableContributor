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
        tableheader: '&'

    },
    controller: customTableCtrl,
    controllerAs: 'customTableCtrl'


});

function customTableCtrl() {

    var customTableCtrl = this;
    console.log(this);
    // headervalue is a function which passed the respective header 
    customTableCtrl.headervalue = function(header) {

            customTableCtrl.tableheader({ 'key': header }); // calling the parent tableheader() function by passing the header of table 
        }
        // searchopentab is a function that will hide the main toolbar
    customTableCtrl.serchopentab = function() {
        customTableCtrl.options.Search = true;
        customTableCtrl.options.rowSelection = true;

    }
    customTableCtrl.closeSearchnavbar = function() {
        customTableCtrl.options.Search = false;
        customTableCtrl.options.rowSelection = false;
    }
    customTableCtrl.options = {
        rowSelection: false,
        pageSelect: true,
        Search: false,
        deletenavbar: false

    };

    customTableCtrl.selected = [];//it is used to store the table row id
    customTableCtrl.filteredarray = [];//it is used to filtered the unselected table row and get the only selectable table row.


    customTableCtrl.query = {
        limit: 5,
        page: 1
    };
    // tablerow is a function passing the respective id of a particular row 
    customTableCtrl.tablerow = function(tableobj) {
            customTableCtrl.options.deletenavbar = true;
            customTableCtrl.options.rowSelection = true;
            customTableCtrl.selected.push(tableobj._id);

        }
        //seclectedRowId is a function passing the respective id of a particular row 
    customTableCtrl.seclectedRowId = function() {

        customTableCtrl.options.rowSelection = false;

        customTableCtrl.options.deletenavbar = false;
        customTableCtrl.filteredarray.push(customTableCtrl.selected[0]);//pushing first element to the filteredarray[] array from selected[] array

        for (var i = 1; i < customTableCtrl.selected.length; i++) {
            if (customTableCtrl.selected[i] != customTableCtrl.selected[i - 1]) {
                customTableCtrl.filteredarray.push(customTableCtrl.selected[i]);
                //removing the redundant data from the selected[] array and pushing it to the filteredarray[].
            } else {
                customTableCtrl.filteredarray.pop(customTableCtrl.selected[i]);
                //poped out the unselected tablerow from the filteredarray[].
            }
        }
        console.log("filteredarray", customTableCtrl.filteredarray);
        customTableCtrl.tablerowid({ 'id': customTableCtrl.filteredarray });//calling the parent tablerowid() function that is binded to the component.
    }

    //tableinformation is user for first time loading the table data
    customTableCtrl.tableinformation({ "pageno": 0, 'pagelimit': 5 });
    customTableCtrl.onPaginate = function(pageno, pagelimit) {
        //onPaginate is a function that iterate on the no of pages as well as calling the parent tableinformation function  
        customTableCtrl.tableinformation({ "pageno": pageno, 'pagelimit': pagelimit });

    }



}
