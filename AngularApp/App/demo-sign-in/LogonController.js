var app = angular.module("signUp", []);

app.directive('disabler', function ($compile) {
    return {
        link: function (scope, elm, attrs) {
            var btnContents = $compile(elm.contents())(scope);
            scope.$watch(attrs.ngModel, function (value) {
                if (value) {
                    elm.html(scope.$eval(attrs.disabler));
                    elm.attr('disabled', true);
                } else {
                    elm.html('').append(btnContents);
                    elm.attr('disabled', false);
                }
            });
        }
    }
})


function SignUpController($scope, $http) {
    $scope.isSaveDisabled = function () {
        return $scope.signUpForm.$invalid;
    };

    $scope.saveNewUser = function () {
        $scope.loading = true;
        $http(
        {
            url: '../data/data.ashx',
            method: 'POST',
            data: $scope.user,
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.loading = false;
            $scope.userCreationSuccess = true;
            $scope.user.id = data.Id;
        });
    };
};

