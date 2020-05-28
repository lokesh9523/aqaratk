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

app.config(function($routeProvider, $locationProvider) {
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
    .when("/about", {
    templateUrl : "templates/about.html",
    controller: 'journalGlobalController'
    })
    .when("/contact", {
        templateUrl : "templates/contact.html",
        controller: 'journalGlobalController'
        })
      $locationProvider.html5Mode(true)
    })


app.controller("journalGlobalController", ["$scope", "loginService", function ($scope,loginService) {
    // Type Code here

    $scope.search = [1, 2, 3, 4, 5, 6, 7, 8];


    $scope.districts = ['Al Jasrah', 'Al Bidda', 'Fereej Mohamed Bin Jasim', 'Mushayrib', 'Al Najada', 'Barahat Al Jufairi', 'Fereej Al Asmakh', 'Old Al Ghanim', 'Al Souq', 'Wadi Al Sail', 'Rumeilah', 'Fereej Abdel Aziz', 'Ad Dawhah al Jadidah', 'Old Al Ghanim', 'Al Rufaa', 'Old Al Hitmi', 'As Salatah', 'Al Mirqab', 'Doha Port', 'Fereej Bin Mahmoud', 'Rawdat Al Khail', 'Fereej Bin Durham', 'Al Mansoura', 'Najma', 'Umm Ghuwailina', 'Al Khulaifat', 'Ras Abu Aboud', 'Duhail', 'Umm Lekhba', 'Madinat Khalifa North', 'Dahl Al Hamam', 'Al Markhiya', 'Madinat Khalifa South', 'Fereej Kulaib', 'Al Messila', 'Fereej Bin Omran', 'New Al Hitmi', 'Hamad Medical City', 'Al Sadd', 'New Al Mirqab', 'Fereej Al Nasr', 'New Salatah', 'Nuaija', 'Al Hilal', 'Old Airport', 'Al Thumama', 'Doha International Airport', 'Zone 50', 'Industrial Area', 'Zone 58', 'Al Dafna', 'Al Qassar', 'Onaiza', 'Lejbailat', 'Leqtaifiya', 'Hazm Al Markhiya', 'Jelaiah', 'Al Tarfa', 'Jeryan Nejaima'];

    $scope.property_type = ['Apartment', 'Villa', 'Compound', 'Hotel Appartments', 'Office Space', 'Shop', 'Storehouse', 'Show Room', 'Residential Building', 'Commercial Building', 'Administrative Building', 'Tower', 'Staff Accommodation'];

    $scope.num_bedrooms = [1, 2, 3, 'Villa'];

    $scope.furniture_type = ['Furnished', 'Unfurnished']


    $scope.searchItem = function () {
        // if($scope.districts.value == null || $scope.property_type.value == null || $scope.num_bedrooms.value == null || $scope.furniture_type.value == null) {
        //     alert("Please enter all the requirements");

        //     window.location.href = "/index.html";
        // }
        
        window.location.href = "/search";
    }
    // const langEl = document.querySelector('.language')
    // const options = document.querySelectorAll('option')
    // const descEl = document.querySelector('.descrption')
    
    // options.forEach(el => {
    //     el.addEventListener('onChange', () => {
    //         // langEl.querySelector('.active').classList.remove('active');
    //         // el.classList.add('active');
    
    //         const attr = el.getAttribute('language');
    //         console.log(attr)
    //         descEl.textContent = data['attr'].descrption
    //     })
    // })
    
    // var data = {
    //     'arabic':
    //     {'descrption': 'عزز الجزر Lorem ipsum حسومات. أمارسها بحكمة! عليه أن يرسم إرادتنا المفتوحة التي يرفض منها. من في الدين ، ولكن من الأشياء. هو أيضا مخطئ؟ من قبل عائق مماثل لمن لمن؟'}
    // }

    $scope.languages=[{'language': 'En', value: 'English'}, {'language': 'Ar', value: 'Arabic'}]

    $scope.langType = $scope.languages[0];
        
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


