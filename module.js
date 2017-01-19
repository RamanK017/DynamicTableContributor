angular.module("smartTable",['ngMaterial','md.data.table'])
.controller('tableCtrl', function(service) {

 var ctrl=this;
 var promise=service.servicedata();
 promise.then(function(dataobj){
 	ctrl.desserts=dataobj.data;
 	console.log("moduledata",ctrl.desserts);

 });

});

