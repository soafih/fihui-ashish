var fihApp = angular.module('fihApp', ['ui.bootstrap','ngResource', 'ngRoute']);

fihApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/marketplace.html',
            controller: 'MarketPlaceCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
        })
        .when('/help', {
            templateUrl: 'partials/help.html',
        })
        .when('/apps', {
            templateUrl: 'partials/apps.html',
            controller: 'AppsCtrl'
        })
        .when('/appdetails', {
            templateUrl: 'partials/app-details.html',
        })
        .when('/add-api', {
            templateUrl: 'partials/api-form.html',
            controller: 'AddApiCtrl'
        })
        .when('/add-app', {
            templateUrl: 'partials/app-form.html',
            controller: 'AddAppCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

fihApp.controller('MarketPlaceCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        $scope.pageHeader = "API Markeplace";
        var Apis = $resource('/fih/apis');
        Apis.query(function(apis){
            $scope.apis = apis;
        });
    }]);

fihApp.controller('AppsCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        $scope.pageHeader = "Applications/Integration Services";
        var Apps = $resource('/fih/apps');
        Apps.query(function(apps){
            $scope.apps = apps;
        });
    }]);

fihApp.controller('AddApiCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.pageHeader = "API Configuration";
        $scope.save = function(){
            var Apis = $resource('/fih/apis');
            Apis.save($scope.api, function(){
                $location.path('/');
            });
        };
    }]);

fihApp.controller('AddAppCtrl', ['$scope', '$resource', '$location',
    function($scope, $http, $resource, $location){
        $scope.pageHeader = "Application / Integration Service Configuration";
        $scope.save = function(){
            var Apps = $resource('/fih/apps');
            Apps.save($scope.app, function(){
                $location.path('/');
            });
        };
        
        $scope.stackatoOrg = ["SOA"];
        $scope.selectedOrg = $scope.stackatoOrg[0];

        $scope.stackatoSpace = ["SOA", "FIH"];
        $scope.selectedSpace = $scope.stackatoSpace[0];

        $scope.dbSearchOption = ["Database Name", "Database Type"];
        $scope.dbSearchSelected = $scope.dbSearchOption[0];
  
        // Any function returning a promise object can be used to load values asynchronously
       // Any function returning a promise object can be used to load values asynchronously
        $scope.getLocation = function(val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
            }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
            });
        };
    }]);
