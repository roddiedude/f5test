'use strict';

var myApp = angular.module('MyAjaxDemoApp', []);

function AjaxDemoController($scope, $http) {
    $http.get('../data/employees.json').success(function (data) {
        $scope.employees = data;
    });
}

myApp.controller('AjaxDemoController', ['$scope', '$http', AjaxDemoController]);