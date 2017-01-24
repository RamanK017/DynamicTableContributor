angular.module('ngTable').factory('tableDataService', function($http, $q) //declaration of factory
    {
        var servicectrl = this;
        var factoryobj = {};//It is an object which is used to store the function servicedata
         
        factoryobj.servicedata = function(pageno,pagelimit) {

            var deferred = $q.defer();//creating the instance of promise variable
            //calling the api 'http://localhost:3000/data' to get the Json data.
            $http.get("http://localhost:3000/data?_start="+(pageno*pagelimit)+"&_end="+((pageno*pagelimit)+pagelimit)).then(function(response) {
                servicectrl.response = response.data;//save the response.data in servicectrl.response
                var pageCount = response.headers('X-Total-Count');//it will get the total object count in the API request.
                response["pageCount"] = pageCount;//storing the total count of object as a key called "pageCount" in response
                console.log("in service", servicectrl.response);
                deferred.resolve(response);//resolving the promises

            });
            return deferred.promise;

        };

        return factoryobj;

    });
