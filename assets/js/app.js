var app = angular.module("myApp", ['ngRoute',
    'ngResource', 'ngCookies']);


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
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
app.config(function ($routeProvider, $locationProvider) {
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
        controller: 'propertyController'
      })
    .when("/about", {
        templateUrl : "templates/about.html",
        controller: 'journalGlobalController'
    })
    .when("/contact", {
        templateUrl : "templates/contact.html",
        controller: 'journalGlobalController'
    })
    .when("/property", {
        templateUrl : "templates/properties/properties.html",
        controller: 'journalGlobalController'
    })
      $locationProvider.html5Mode(true)
    })


});

app.service('fileUpload', ['$http', '$q', function ($http, $q) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        console.log("iam here")
        var def = $q.defer();
        var fd = new FormData();
        fd.append('image', file);
        console.log(fd);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (data) {
            def.resolve(data.data.data);
        },
            function (error) {
                def.reject(error.data);
            });
        return def.promise;
    }
}
]);
app.controller("journalGlobalController", ["$scope", "loginService", "propertyService", function ($scope, loginService, propertyService) {
    // Type Code here
    var api = 'http://localhost:3001/property/types'
    propertyService.getPropertyTypes(api).then(function (data) {
        $scope.property = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });

    // $scope.location = [];

    var locationapi = 'http://localhost:3001/location'
    propertyService.getLocation(locationapi).then(function (data) {
        $scope.location = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });

    $scope.search = [1, 2, 3, 4, 5, 6, 7, 8];


//     $scope.districts = ['Al Jasrah', 'Al Bidda', 'Fereej Mohamed Bin Jasim', 'Mushayrib', 'Al Najada', 'Barahat Al Jufairi', 'Fereej Al Asmakh', 'Old Al Ghanim', 'Al Souq', 'Wadi Al Sail', 'Rumeilah', 'Fereej Abdel Aziz', 'Ad Dawhah al Jadidah', 'Old Al Ghanim', 'Al Rufaa', 'Old Al Hitmi', 'As Salatah', 'Al Mirqab', 'Doha Port', 'Fereej Bin Mahmoud', 'Rawdat Al Khail', 'Fereej Bin Durham', 'Al Mansoura', 'Najma', 'Umm Ghuwailina', 'Al Khulaifat', 'Ras Abu Aboud', 'Duhail', 'Umm Lekhba', 'Madinat Khalifa North', 'Dahl Al Hamam', 'Al Markhiya', 'Madinat Khalifa South', 'Fereej Kulaib', 'Al Messila', 'Fereej Bin Omran', 'New Al Hitmi', 'Hamad Medical City', 'Al Sadd', 'New Al Mirqab', 'Fereej Al Nasr', 'New Salatah', 'Nuaija', 'Al Hilal', 'Old Airport', 'Al Thumama', 'Doha International Airport', 'Zone 50', 'Industrial Area', 'Zone 58', 'Al Dafna', 'Al Qassar', 'Onaiza', 'Lejbailat', 'Leqtaifiya', 'Hazm Al Markhiya', 'Jelaiah', 'Al Tarfa', 'Jeryan Nejaima'];

//     $scope.property_type = ['Apartment', 'Villa', 'Compound', 'Hotel Appartments', 'Office Space', 'Shop', 'Storehouse', 'Show Room', 'Residential Building', 'Commercial Building', 'Administrative Building', 'Tower', 'Staff Accommodation'];

    $scope.num_bedrooms = [1, 2, 3, 'Villa'];

    $scope.furniture_type = ['Furnished', 'Unfurnished']


//     $scope.searchItem = function () {

//         window.location.href = "/search";
//     }

    $scope.languages=[{'language': 'En', value: 'English'}, {'language': 'Ar', value: 'Arabic'}]

//     $scope.langType = $scope.languages[0];
        
    $scope.searchItem = function () {
        var postParams = {
            'location_id': $scope.location_id ? $scope.location_id.id : '',
            'property_id': $scope.property_id ? $scope.property_id.id : '',
            'no_of_bed_rooms': $scope.no_of_bed_rooms ? $scope.no_of_bed_rooms : '',
            'furniture': $scope.furniture ? $scope.furniture : ''
        };
        var api = 'http://localhost:3001/property/search';
        return propertyService.search(api, postParams).then(function (data) {
            $scope.totalproperty = data;
            window.location = '#!search'
        }).catch(function (error) {
            $scope.errorMessage = error.data;
        });
    }
    $scope.num_bedrooms = [1, 2, 3, 4, 5, 6];

    $scope.furniture_type = ['Semi Furnished', 'Fully Furnished']

}]);

app.controller("loginController", ['$scope', 'loginService', '$cookies', function ($scope, loginService, $cookies) {
    // $scope.errorMessage = false;
    $scope.submitLogin = function () {
        $scope.error = {
            message: null
        };
        var postParams = {
            'user_name': $scope.user_name,
            'password': $scope.password
        };

        var api = 'http://localhost:3001/login';

        return loginService.authenticateUser(api, postParams)
            .then(function (data) {
                $cookies.put("access_token", data.token);
                $cookies.put("login_id", data.id);
                console.log(data, "====================")
            })
            .catch(function (error) {
                console.log(error)
                $scope.errorMessage = error.data;
            });
    };
}]);
app.controller("registerController", ["$scope", "registerService", function ($scope, registerService) {
    $scope.submitRegister = function () {
        $scope.error = {
            message: null
        };
        var postParams = {
            'user_name': $scope.user_name,
            'password': $scope.password,
            'email': $scope.email,
            'mobile_number': $scope.mobile_number,
            'name': $scope.name
        };

        var api = 'http://localhost:3001/register';

        return registerService.registerUser(api, postParams)
            .then(function (data) {
                console.log(data, "===================")
                alert("Registered Successfully Please Login");
            })
            .catch(function (error) {
                $scope.errorMessage = error.data;
            });
    };
}])
app.controller("propertyController", ["$scope", "propertyService", "$cookies", "fileUpload", function ($scope, propertyService, $cookies, fileUpload) {
    // $scope.property = [];
    $scope.num_bedrooms = [1, 2, 3, 4, 5, 6];

    $scope.furniture_type = ['Semi Furnished', 'Fully Furnished']
    var api = 'http://localhost:3001/property/types'
    propertyService.getPropertyTypes(api).then(function (data) {
        $scope.property = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });

    // $scope.location = [];

    var locationapi = 'http://localhost:3001/location'
    propertyService.getLocation(locationapi).then(function (data) {
        $scope.location = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });


    $scope.login_id = $cookies.get('login_id')
    $scope.postProperty = function () {
        $scope.login_id = $cookies.get('login_id')
        var postParams = {
            'login_id': $scope.login_id,
            'location_id': $scope.location_id.id,
            'property_id': $scope.property_id.id,
            'no_of_bed_rooms': $scope.no_of_bed_rooms,
            'furniture': $scope.furniture
        };

        var file = $scope.myFile;
        var api = 'http://localhost:3001/property/1';
        propertyService.postProperty(api, postParams)
            .then(function (data) {
                console.log(data, "=======")
                var uploadUrl = "http://localhost:3001/property/" + $scope.login_id + "/1";
                console.log(uploadUrl)
                fileUpload.uploadFileToUrl(file, uploadUrl);
                console.log(data, "=======")
            }).catch(function (error) {
                $scope.errorMessage = error.data;
            });
    }
    // $scope.uploadimage = function (id, file) {
    //     console.log(id, file, "==================")
    //     let property_id = id;
    //     console.log("iam here,;;;;;;;")

    // }
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
app.service('propertyService', function ($http, $q) {
    return {
        postProperty: function (api, postParams) {
            var def = $q.defer();
            $http.post(api, postParams, {

            }).then(function (data) {
                def.resolve(data.data.data);
            },
                function (error) {
                    def.reject(error.data);
                });
            return def.promise;
        },
        search: function (api, postParams) {
            var def = $q.defer();
            $http.put(api, postParams, {

            }).then(function (data) {
                def.resolve(data.data.data);
            },
                function (error) {
                    def.reject(error.data);
                });
            return def.promise;
        },
        getPropertyTypes: function (api, postParams) {
            var def = $q.defer();
            $http.get(api, postParams, {

            }).then(function (data) {
                def.resolve(data.data.data);
            },
                function (error) {
                    def.reject(error.data);
                });
            return def.promise;
        },
        getproperty: function (api, postParams) {
            var def = $q.defer();
            $http.post(api, postParams, {

            }).then(function (data) {
                def.resolve(data.data.data);
            },
                function (error) {
                    def.reject(error.data);
                });
            return def.promise;
        },
        getLocation: function (api, postParams) {
            var def = $q.defer();
            $http.get(api, postParams, {

            }).then(function (data) {
                def.resolve(data.data.data);
            },
                function (error) {
                    def.reject(error.data);
                });
            return def.promise;
        }
    }
})


