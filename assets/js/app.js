var app = angular.module("myApp", ['ngRoute',
'ngResource','ngCookies']);


app.directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/nav/nav.html',
    };
});

app.directive('footerFile', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/footer/footer.html',
    };
});

app.directive('searchBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/search/search.html',
    };
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "templates/main.html",
      controller: 'journalGlobalController'
    })
    .when("/search", {
      templateUrl : "templates/search.html",
      controller: 'journalGlobalController'
    })
    .when("/post", {
        templateUrl : "templates/post/post_property.html",
        controller: 'journalGlobalController'
      })
  });

app.controller("journalGlobalController", ["$scope", "loginService", function ($scope,loginService) {
    // Type Code here

    $scope.search = [1, 2, 3, 4, 5, 6, 7, 8];

    $scope.searchItem = function () {
        window.location.href = "templates/search.html";
        var api ='http://localhost:3001/login';
        var postParams =  {
            'user_name': '8106986509',
            'password': 'test'
        };
    
        return loginService.authenticateUser(api, postParams)
            .then(function (data) {
                console.log(data,"====================")
            })
            .catch(function (error) {
                $scope.error = {
                    message: error.message
                };
            });
    }
    $scope.districts = ['Al Jasrah', 'Al Bidda', 'Fereej Mohamed Bin Jasim', 'Mushayrib', 'Al Najada', 'Barahat Al Jufairi', 'Fereej Al Asmakh', 'Old Al Ghanim', 'Al Souq', 'Wadi Al Sail', 'Rumeilah', 'Fereej Abdel Aziz', 'Ad Dawhah al Jadidah', 'Old Al Ghanim', 'Al Rufaa', 'Old Al Hitmi', 'As Salatah', 'Al Mirqab', 'Doha Port', 'Fereej Bin Mahmoud', 'Rawdat Al Khail', 'Fereej Bin Durham', 'Al Mansoura', 'Najma', 'Umm Ghuwailina', 'Al Khulaifat', 'Ras Abu Aboud', 'Duhail', 'Umm Lekhba', 'Madinat Khalifa North', 'Dahl Al Hamam', 'Al Markhiya', 'Madinat Khalifa South', 'Fereej Kulaib', 'Al Messila', 'Fereej Bin Omran', 'New Al Hitmi', 'Hamad Medical City', 'Al Sadd', 'New Al Mirqab', 'Fereej Al Nasr', 'New Salatah', 'Nuaija', 'Al Hilal', 'Old Airport', 'Al Thumama', 'Doha International Airport', 'Zone 50', 'Industrial Area', 'Zone 58', 'Al Dafna', 'Al Qassar', 'Onaiza', 'Lejbailat', 'Leqtaifiya', 'Hazm Al Markhiya', 'Jelaiah', 'Al Tarfa', 'Jeryan Nejaima'];

    $scope.property_type = ['Apartment', 'Villa', 'Compound', 'Hotel Appartments', 'Office Space', 'Shop', 'Storehouse', 'Show Room', 'Residential Building', 'Commercial Building', 'Administrative Building', 'Tower', 'Staff Accommodation'];

    $scope.num_bedrooms = [1, 2, 3, 4, 5, 6];

    $scope.furniture_type = ['Semi Furnished', 'Fully Furnished']
  
        
}]);

app.controller("loginController", ['$scope', 'loginService','$cookies', function ($scope,loginService,$cookies) {
    // $scope.errorMessage = false;
	$scope.submitLogin = function(){
        $scope.error = {
            message: null
        };
        var postParams =  {
            'user_name': $scope.user_name,
            'password': $scope.password
        };

        var api ='http://localhost:3001/login';

        return loginService.authenticateUser(api, postParams)
        .then(function (data) {
		 $cookies.put("access_token", data.token);
		 $cookies.put("login_id", data.id);	 
            console.log(data,"====================")
        })
        .catch(function (error) {
            console.log(error)
            $scope.errorMessage = error.data;
        });
    };
}]);
app.controller("registerController",["$scope","registerService",function($scope,registerService){
    $scope.submitRegister = function(){
        $scope.error = {
            message: null
        };
        var postParams =  {
            'user_name': $scope.user_name,
            'password': $scope.password,
            'email':$scope.email,
            'mobile_number':$scope.mobile_number,
            'name':$scope.name
        };

        var api ='http://localhost:3001/register';

        return registerService.registerUser(api, postParams)
        .then(function (data) {
            console.log(data,"===================")
            alert("Registered Successfully Please Login"); 
        })
        .catch(function (error) {
            $scope.errorMessage= error.data;
        });
    };
}])


app.service('loginService', function ($http, $q) {
    return {
        authenticateUser: function (api, postParams) {
            var def = $q.defer();
            $http.post(api, postParams, {
                headers: {
                    'source': 15
                }
            })
                .then(function (data) {
                    def.resolve(data.data.data);
                },
                    function (error) {
                        def.reject(error.data);
                    });
            return def.promise;
        }
    };
});
app.service('registerService', function ($http, $q) {
    return {
        registerUser: function (api, postParams) {
            var def = $q.defer();
            $http.post(api, postParams, {
               
            })
                .then(function (data) {
                    def.resolve(data.data.data);
                },
                    function (error) {
                        def.reject(error.data);
                    });
            return def.promise;
        }
    };
});
