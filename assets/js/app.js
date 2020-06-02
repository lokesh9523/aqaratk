var translationsEN = {
    LOGIN: 'Login',
    REGISTER: 'Register',
    LOCATION: 'Westbay, Doha, Qatar',
    SUBTITLE : 'Subtitle',
    QATAR: 'Qatar',
    IDEAL: 'FIND YOUR IDEAL',
    APARTMENT : 'APARTMENT',
    RENT : 'FOR RENT',
    WITH_US : 'WITH US',
    we_are_realestate: 'WE ARE REALESTATE',
    post: 'Post',
    property : 'Property',
    about_aqa : 'About Aqaratk',
    know_more : 'KNOW MORE',
    HOME : 'HOME',
    Properties : 'Properties',
    Contact : 'Contact',
    about_us : 'About US',
    Quick : 'Quick',
    Links : 'Links',
    follow_us : 'FOLLOW US',
    our_loc : 'Our Location',
    Copyright : 'Copyright',
    all_rights : 'All Rights Reserved',
    Mobile : 'Mobile'
  };
   
  var translationsAR= {
    LOGIN: ' تسجيل الدخول ',
    REGISTER: 'تسجيل!',
    LOCATION: 'الدوحة, قطرالخليج, الغربي',
    SUBTITLE : 'العنوان الفرعي',
    QATAR : 'دولة قطر',
    IDEAL : 'تجد المثالي الخاص بك',
    APARTMENT : 'شقة',
    RENT : 'للإيجار',
    WITH_US : 'معنا',
    we_are_realestate : 'نحن عقارات',
    post : 'ما بعد',
    property : 'خاصية',
    about_aqa : 'عن عقاراتك',
    know_more : 'تعرف أكثر',
    Home : 'منزل',
    Properties : 'الخصائص',
    Contact: 'اتصل',
    about_us : 'معلومات عنا',
    Quick : 'بسرعة',
    Links: 'الروابط',
    follow_us : 'تابعنا',
    our_loc : 'موقعنا',
    Copyright : 'حقوق النشر',
    all_rights : 'كل الحقوق محفوظة',
    Mobile : 'جوال'
  };



var app = angular.module("myApp", ['ngRoute','pascalprecht.translate',
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

// app.directive('searchBar', function () {
//     return {
//         restrict: 'E',
//         templateUrl: 'templates/search/search.html',
//     };
// });
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

app.config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('ar', translationsAR);
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  }]);
   

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
app.controller("journalGlobalController", ["$translate", "$scope", "loginService", "propertyService", function ($translate,$scope, loginService, propertyService) {

    // $scope.listOfLanguages = ['AR', 'En'];
    
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };
    
    
    
    // Type Code here
    var api = 'http://15.206.186.93:3001/property/types'
    propertyService.getPropertyTypes(api).then(function (data) {
        $scope.property = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });

    // $scope.location = [];

    var locationapi = 'http://15.206.186.93:3001/location'
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

    $scope.languages = [{ 'language': 'En', value: 'English' }, { 'language': 'Ar', value: 'Arabic' }]

    //     $scope.langType = $scope.languages[0];

    $scope.searchItem = function () {
        console.log(window.location.search,"==================");
        console.log($scope.location_id,"==",$scope.property_id,"---",$scope.no_of_bed_rooms,"===",$scope.furniture)
        if($scope.location_id || $scope.property_id || $scope.no_of_bed_rooms || $scope.furniture){
            console.log("iam here")
            var postParams = {
                'location_id': $scope.location_id ? $scope.location_id.id : '',
                'property_id': $scope.property_id ? $scope.property_id.id : '',
                'no_of_bed_rooms': $scope.no_of_bed_rooms ? $scope.no_of_bed_rooms : '',
                'furniture': $scope.furniture ? $scope.furniture : ''
            };
    
            var api = 'http://15.206.186.93:3001/property/search';
            // let query= '';
            // if($scope.location_id){query = query + }
            // return propertyService.search(api, postParams).then(function (data) {
            //     $scope.totalproperty = data;
             window.location.href = '/search?location_id=' + postParams.location_id + '&property_id=' + postParams.property_id + '&no_of_bed_rooms' + postParams.no_of_bed_rooms + '&furniture=' + postParams.furniture;
            // }).catch(function (error) {
            //     $scope.errorMessage = error.data;
            // });

        }else{
            alert("Select Atleast One Field")
        }
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

        var api = 'http://15.206.186.93:3001/login';

        return loginService.authenticateUser(api, postParams)
            .then(function (data) {
                $cookies.put("access_token", data.token);
                $cookies.put("login_id", data.id);
                window.location.href = "/";
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

        var api = 'http://15.206.186.93:3001/register';

        return registerService.registerUser(api, postParams)
            .then(function (data) {
                console.log(data, "===================")
                alert("Registered Successfully Please Login");
                window.location.href='/';
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
    var api = 'http://15.206.186.93:3001/property/types'
    propertyService.getPropertyTypes(api).then(function (data) {
        $scope.property = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });

    // $scope.location = [];

    var locationapi = 'http://15.206.186.93:3001/location'
    propertyService.getLocation(locationapi).then(function (data) {
        $scope.location = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });


    $scope.login_id = $cookies.get('login_id');
    $scope.postProperty = function () {
        $scope.login_id = $cookies.get('login_id')
        if($scope.login_id){
           
            
            var file = $scope.myFile;
            if($scope.location&&$scope.property_id&&$scope.no_of_bed_rooms&&$scope.furniture&&file&&$scope.price){ var postParams = {
                'login_id': $scope.login_id,
                'location_id': $scope.location_id.id,
                'property_id': $scope.property_id.id,
                'no_of_bed_rooms': $scope.no_of_bed_rooms,
                'furniture': $scope.furniture,
                'price':$scope.price
            };
                var api = 'http://15.206.186.93:3001/property/1';
                propertyService.postProperty(api, postParams)
                    .then(function (data) {
                        console.log(data, "=======")
                        var uploadUrl = "http://15.206.186.93:3001/property/" + $scope.login_id + "/"+data.id;
                        console.log(uploadUrl)
                        fileUpload.uploadFileToUrl(file, uploadUrl);
                        alert("Property Posted Sucessfully")
                    }).catch(function (error) {
                        $scope.errorMessage = error.data;
                    });
            }else{
                alert("Please Enter All the fields")
            }
            
        }else{
            alert("Please Login")
        }
        
    }
    // $scope.uploadimage = function (id, file) {
    //     console.log(id, file, "==================")
    //     let property_id = id;
    //     console.log("iam here,;;;;;;;")

    // }
}])
app.controller("searchController", ['$scope', 'propertyService', '$cookies', function ($scope, propertyService, $cookies) {
    
    
    var api = 'http://15.206.186.93:3001/property/types'
    propertyService.getPropertyTypes(api).then(function (data) {
        $scope.property = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });

    // $scope.location = [];

    var locationapi = 'http://15.206.186.93:3001/location'
    propertyService.getLocation(locationapi).then(function (data) {
        $scope.location = data

    }).catch(function (error) {
        $scope.errorMessage = error.data;
    });
    $scope.num_bedrooms = [1, 2, 3, 4, 5, 6];

    $scope.furniture_type = ['Semi Furnished', 'Fully Furnished']
    const urlParams = new URLSearchParams(window.location.search);
    let property_id = urlParams.get('property_id');
    let location_id = urlParams.get('location_id');
    let no_of_bed_rooms = urlParams.get('no_of_bed_rooms') ;
    let furniture = urlParams.get('furniture');
    if(urlParams.get('property_id') || urlParams.get('location_id') || urlParams.get('no_of_bed_rooms') || urlParams.get('furniture')){

        // if(!$scope.property_id){console.log("imhere");$scope.property_id = ""};
        // if(!$scope.location_id){$scope.location_id = ""};
        // if(!$scope.no_of_bed_rooms){$scope.no_of_bed_rooms = ""};
        // if(!$scope.furniture){$scope.furniture = ""}
        var postParams = {
            'location_id': location_id ? location_id : '',
            'property_id': property_id ? property_id : '',
            'no_of_bed_rooms': no_of_bed_rooms ? no_of_bed_rooms : '',
            'furniture': furniture ? furniture : ''
        };
        console.log($scope.property_id,$scope.location_id,postParams)
        var searchapi = 'http://15.206.186.93:3001/property/search';
         return propertyService.search(searchapi, postParams).then(function (data) {
                $scope.totalproperty = data;
                $scope.totalproperty.forEach(element=>{
                    if(element.images){
                        element.images = angular.fromJson(element.images);
                        // if(typeof element.images['0'] === 'string'){
                        //     console.log("iam ia string")
                        //     element.images['0'] = JSON.parse(element.images['0']);
                        //     console.log(typeof element.images['0'])
                        // }
                    }
                })
            }).catch(function (error) {
                $scope.errorMessage = error.data;
            });
    }else{

    }
    $scope.searchItem = function () {
        console.log($scope.location_id,"==",$scope.property_id,"---",$scope.no_of_bed_rooms,"===",$scope.furniture)
        if($scope.location_id || $scope.property_id || $scope.no_of_bed_rooms || $scope.furniture){
            console.log("iam here")
            var postParams = {
                'location_id': $scope.location_id ? $scope.location_id.id : '',
                'property_id': $scope.property_id ? $scope.property_id.id : '',
                'no_of_bed_rooms': $scope.no_of_bed_rooms ? $scope.no_of_bed_rooms : '',
                'furniture': $scope.furniture ? $scope.furniture : ''
            };
            console.log($scope.property_id,$scope.location_id,postParams)
            var searchapi = 'http://15.206.186.93:3001/property/search';
             return propertyService.search(searchapi, postParams).then(function (data) {
                    $scope.totalproperty = data;
                    $scope.totalproperty.forEach(element=>{
                        if(element.images){
                            element.images = angular.fromJson(element.images);
                            // if(typeof element.images['0'] === 'string'){
                            //     console.log("iam ia string")
                            //     element.images['0'] = JSON.parse(element.images['0']);
                            //     console.log(typeof element.images['0'])
                            // }
                        }
                    })
                }).catch(function (error) {
                    $scope.errorMessage = error.data;
                });

        }else{
            alert("Select Atleast One Field")
        }
    }
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


