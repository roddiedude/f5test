function Controller($scope) {
    $scope.master = {};

    $scope.user = {
        name: "KK",
        dt: new Date()
    };

    $scope.update = function () {
        $scope.master = angular.copy($scope.user);
    };

    $scope.reset = function () {
        $scope.user = angular.copy($scope.master);
    };

    //$scope.reset();
}