angular.module('smartTable').component('datasTable', {
    templateUrl:'components/smart-table/template.html',
    bindings:{
    	objectdata:'<'
    },
    controller: compCtrl,
    controllerAs: 'compCtrl'
    

});

function compCtrl() {
	var comp=this;
  comp.getTypes = function () {
    return ['Candy', 'Ice cream', 'Other', 'Pastry'];
  };
}
