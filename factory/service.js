angular.module('ngTable').factory('tableDataService', function($http, $q) //declaration of factory
    {
        var servicectrl = this;
        var factoryobj = {};
        
        factoryobj.servicedata = function(pageno) {
            var deferred = $q.defer();
            $http.get("http://localhost:3000/data?_start="+(pageno*3)+"&_end="+((pageno*3)+3)).then(function(response) {
                servicectrl.response = response.data;
                var pageCount = response.headers('X-Total-Count');
                response["pageCount"] = pageCount;
                console.log("in service", servicectrl.response);
                deferred.resolve(response);

            });
            return deferred.promise;

        };

        return factoryobj;

    });
