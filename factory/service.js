angular.module('smartTable').factory('service', function($http, $q) //declaration of factory
    {
        var servicectrl = this;
        var factory = {};
        var deferred = $q.defer();
        factory.servicedata = function() {

            $http.get('http://localhost:3000/data').then(function(desserts) {

                servicectrl.desserts = desserts.data;
                console.log("in service", servicectrl.desserts);
                deferred.resolve(desserts);

            });
            return (deferred.promise);

        };

        return factory;

    });
