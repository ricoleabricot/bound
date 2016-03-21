/* 
* @Author: gicque_p
* @Date:   2016-02-02 13:44:37
* @Last Modified by:   Kafei59
* @Last Modified time: 2016-03-21 15:17:49
*/

app.factory('apiService', function() {
    var defaultIP = window.location.hostname;
    if (defaultIP != 'localhost' && defaultIP != '127.0.0.1') {
        var serverIP = 'api.bound-app.com';
    } else {
        var serverIP = defaultIP + '/~gicque_p/bound/desk/web/app_dev.php/api';
    }

    var serverPath = location.protocol + '//' + serverIP;
    var service = {
        serverPath: serverPath,

        LOGIN: serverPath + '/login',
        REGISTER: serverPath + '/register',
        RESETTING: serverPath + '/resetting',
        TOKEN: serverPath + '/token',

        LOGIN_TWITTER: serverPath + '/oauth/v2.0/twitter/login',
        REGISTER_TWITTER: serverPath + '/oauth/v2.0/twitter/register',
        ASSOCIATE_TWITTER: serverPath + '/oauth/v2.0/twitter/associate',

        LOGIN_FACEBOOK: serverPath + '/oauth/v2.0/facebook/login',
        REGISTER_FACEBOOK: serverPath + '/oauth/v2.0/facebook/register',
        ASSOCIATE_FACEBOOK: serverPath + '/oauth/v2.0/facebook/associate',

        ACHIEVEMENTS_GET: serverPath + '/achievements',
        ACHIEVEMENT_ADD: serverPath + '/achievements',
        ACHIEVEMENT_EDIT: serverPath + '/achievements',
        ACHIEVEMENT_DELETE: serverPath + '/achievements',
        ACHIEVEMENT_LOAD: serverPath + '/achievements/load',

        CREWS_GET: serverPath + '/crews',
        CREWS_ADD: serverPath + '/crews',
        CREWS_EDIT: serverPath + '/crews',
        CREWS_DELETE: serverPath + '/crews',

        NOTIFICATIONS_GET: serverPath + '/notifications',
        NOTIFICATION_ADD: serverPath + '/notifications',
        NOTIFICATION_EDIT: serverPath + '/notifications',
        NOTIFICATION_DELETE: serverPath + '/notifications',

        USERS_GET: serverPath + '/users',
        USERS_ADD: serverPath + '/users',
        USERS_EDIT: serverPath + '/users',
        USERS_DELETE: serverPath + '/users',
    };

    return service;
});

app.factory('cookieService', ['$cookies', function($cookies) {

    function addToken($token) {
        $cookies.put('token', $token);
    }

    function removeToken() {
        $cookies.remove('token');
    }

    function getToken() {
        return $cookies.get('token');
    }

    function isLogged() {
        $token = $cookies.get('token');
        if ($token != null) {
            return true;
        } else {
            return false;
        }
    }

    var service = {
        addToken: addToken,
        removeToken: removeToken,
        getToken: getToken,
        isLogged: isLogged
    };

    return service;
}]);

app.factory('userService', ['$http', 'apiService', 'cookieService', function($http, $apiService, $cookieService) {

    function login($data) {
        return $http.post($apiService.LOGIN, $data, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    function register($data) {
        return $http.post($apiService.REGISTER, $data, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    function logout() {
        $cookieService.removeToken();
    }

    function getUser($token) {
        $data = {
            token: $token
        };

        return $http.post($apiService.TOKEN, $data, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    var service = {
        login: login,
        register: register,
        logout: logout,
        getUser: getUser
    };

    return service;
}]);
