/* 
* @Author: gicque_p
* @Date:   2016-02-02 13:42:51
* @Last Modified by:   gicque_p
* @Last Modified time: 2016-02-05 17:54:11
*/

app.controller('MainController', ['$scope', '$routeParams', '$cookies', 'httpResponse', function($scope, $routeParams, $cookies, $cfpLoadingBar) {
}]);

app.controller('LoginController', ['$scope', '$routeParams', '$cookies', '$window', 'httpResponse', function($scope, $routeParams, $cookies, $window, $cfpLoadingBar) {
    $scope.login = function() {
        if ($scope.username && $scope.password) {
            $value = {'username': $scope.username, 'password': $scope.password};

            httpResponse.post('http://127.0.0.1/~gicque_p/bound/desk/web/app_dev.php/api/login', $value)
            .success(function(data, status) {
                $cookies.put('token', data.token.data);
                $window.location.href = '#/';
                location.reload();
            })
            .error(function(data, status) {
                alert('Auth failed.');
            });
        }
    };
}]);

app.controller('LogoutController', ['$scope', '$routeParams', '$cookies', '$window', 'httpResponse', function($scope, $routeParams, $cookies, $window, $cfpLoadingBar) {
    $cookies.remove('token');
    $window.location.href = '#/';
    location.reload();
}]);

app.controller('RegisterController', ['$scope', '$routeParams', '$cookies', 'httpResponse', function($scope, $routeParams, $cookies, $cfpLoadingBar) {
    $scope.display = true;
}]);
