﻿function FormController($scope) {
    var user = $scope.user = {
        name: 'John Smith',
        address: { line1: '123 Main St.', city: 'Anytown', state: 'AA', zip: '12345' },
        contacts: [{ type: 'IM', value: '1(234) 555-1212' }]
    };

    $scope.state = /^\w\w$/;
    $scope.zip = /^\d\d\d\d\d$/;

    $scope.addContact = function () {
        user.contacts.push({ type: 'email', value: '' });
    };

    //$scope.removeContact = function (contact) {
    //    for (var i = 0, ii = user.contacts.length; i < ii; i++) {
    //        if (contact === user.contacts[i]) {
    //            $scope.user.contacts.splice(i, 1);
    //        }
    //    }
    //};

    $scope.removeContactAtIndex = function (index) {
        console.log(index);
        $scope.user.contacts.splice(index, 1);
    };
}