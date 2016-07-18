var fihApp = angular.module('fihApp', ['ngResource', 'ngRoute']);

fihApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

fihApp.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Apis = $resource('/fih/apis');
        Apis.query(function(apis){
            $scope.apis = apis;
        });
    }]);