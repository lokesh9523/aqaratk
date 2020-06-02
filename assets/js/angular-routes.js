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
    .when("/forgot_password", {
        templateUrl : "templates/forgot_password.html",
        controller: 'journalGlobalController'
    })
      $locationProvider.html5Mode(true)
    });