angular.module('ngTable').component('customTable', {
    templateUrl: 'components/smart-table/template.html',
    transclude: {
        topCorner: 'topCorner',
        rowCorner: 'rowCorner'
    },
    bindings: {
        tableData: '<',
        sendTableNavigationInfo: '&getTableNavigationInfo',
        pageCount: '@',
        sendSearchInput: '&getSearchInput',
        sendRowIdOnDeletion: '&getRowIdOnDeletion',
        sendSortData: '&getSortData',
        sortFlags: '<'

    },
    controller: customTableCtrl,
    controllerAs: 'customTableCtrl'
});

function customTableCtrl() {

    var customTableCtrl = this;
    console.log(this);

    customTableCtrl.sortFields = function() {
            console.log("sortField function is called", customTableCtrl.sortFlags);
        }
        // headervalue is a function which passed the respective header 
    customTableCtrl.headervalue = function(header) {
            var sortOrder;
            if (customTableCtrl.sortFlags[header].ascending === false && customTableCtrl.sortFlags[header].descending === false) {
                customTableCtrl.sortFlags[header].ascending = true;
                sortOrder = "ascending";
            } else {

                customTableCtrl.sortFlags[header].ascending = !customTableCtrl.sortFlags[header].ascending;
                customTableCtrl.sortFlags[header].descending = !customTableCtrl.sortFlags[header].descending;
                if (customTableCtrl.sortFlags[header].ascending === true) {
                    sortOrder = "ascending";
                } else {
                    sortOrder = "descending";
                }
            }
            if (customTableCtrl.currentSortHeader !== undefined && customTableCtrl.currentSortHeader !== header) {
                customTableCtrl.sortFlags[customTableCtrl.currentSortHeader].ascending = false;
                customTableCtrl.sortFlags[customTableCtrl.currentSortHeader].descending = false;

            }
            customTableCtrl.currentSortHeader = header;

            customTableCtrl.sendSortData({ 'key': header, 'sortOrder': sortOrder }); // calling the parent sendSortData() function by passing the header of table 
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

    customTableCtrl.selected = []; //it is used to store the table row id
    customTableCtrl.filteredarray = []; //it is used to filtered the unselected table row and get the only selectable table row.


    customTableCtrl.query = {
        limit: 5,
        page: 1
    };
    // tablerow is a function passing the respective id of a particular row 
    customTableCtrl.tablerow = function(tableobj) {
            customTableCtrl.options.deletenavbar = true;
            customTableCtrl.options.rowSelection = true;
            customTableCtrl.options.Search = false;
            customTableCtrl.selected.push(tableobj._id);

        }
        //seclectedRowId is a function passing the respective id of a particular row 

    customTableCtrl.seclectedRowId = function() {

        customTableCtrl.options.rowSelection = false;

        customTableCtrl.options.deletenavbar = false;

        customTableCtrl.filteredarray.push(customTableCtrl.selected[0]); //pushing first element to the filteredarray[] array from selected[] array

        for (var i = 1; i < customTableCtrl.selected.length; i++) {
            if (customTableCtrl.selected[i] != customTableCtrl.selected[i - 1]) {
                customTableCtrl.filteredarray.push(customTableCtrl.selected[i]);
                //Extracting the unique table rowID from the selected[] array and pushing it to the filteredarray[].
            } else {
                customTableCtrl.filteredarray.pop(customTableCtrl.selected[i]);
                //poped out the unselected tablerow from the filteredarray[].
            }
        }
        console.log("filteredarray", customTableCtrl.filteredarray);

        customTableCtrl.sendRowIdOnDeletion({ 'id': customTableCtrl.filteredarray }); //calling the parent sendRowIdOnDeletion() function that is binded to the component.

    }

    //sendTableNavigationInfo is user for first time loading the table data
    customTableCtrl.sendTableNavigationInfo({ "pageno": 0, 'pagelimit': 5 });
    customTableCtrl.onPaginate = function(pageno, pagelimit) {
        //onPaginate is a function that iterate on the no of pages as well as calling the parent sendTableNavigationInfo function  

        var pageno = pageno - 1;
        //onPaginate is a function that iterate on the no of pages as well as calling the parent sendTableNavigationInfo function  
        customTableCtrl.sendTableNavigationInfo({ "pageno": pageno, 'pagelimit': pagelimit });

    }

}
