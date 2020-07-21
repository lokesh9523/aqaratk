app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "templates/main.html",
      controller: 'journalGlobalController'
    })
    .when("/search", {
      templateUrl: "templates/search.html",
      controller: 'searchController'
    })
    .when("/post", {
      templateUrl: "templates/post/post_property.html",
      controller: 'propertyController'
    })
    .when("/about", {
      templateUrl: "templates/about.html",
      controller: 'journalGlobalController'
    })
    .when("/contact", {
      templateUrl: "templates/contact.html",
      controller: 'contactController'
    })
    .when("/property", {
      templateUrl: "templates/properties/properties.html",
      controller: 'journalGlobalController'
    })
    .when("/forgot_password", {
      templateUrl: "templates/forgot_password.html",
      controller: 'forgotController'
    })
    .when("/required", {
      templateUrl: "templates/post/post_property.html",
      controller: 'propertyController'
    })
    .when("/admin", {
      templateUrl: "templates/search/admin.html",
      controller: 'propertyController'
    })
    .when("/admin_building", {
      templateUrl: "templates/search/admin_building.html",
      controller: 'propertyController'
    })
    .when("/apartment", {
      templateUrl: "templates/search/apartment.html",
      controller: 'propertyController'
    })
    .when("/chalet", {
      templateUrl: "templates/search/chalet.html",
      controller: 'propertyController'
    })
    .when("/commercial", {
      templateUrl: "templates/search/commercial.html",
      controller: 'propertyController'
    })
    .when("/commercial_building", {
      templateUrl: "templates/search/commercial_building.html",
      controller: 'propertyController'
    })
    .when("/commercial_compound", {
      templateUrl: "templates/search/commercial_compound.html",
      controller: 'propertyController'
    })
    .when("/farm", {
      templateUrl: "templates/search/farm.html",
      controller: 'propertyController'
    })
    .when("/hotel", {
      templateUrl: "templates/search/hotel.html",
      controller: 'propertyController'
    })
    .when("/hotel_apartment", {
      templateUrl: "templates/search/hotel_apartment.html",
      controller: 'propertyController'
    })
    .when("/lounge", {
      templateUrl: "templates/search/lounge.html",
      controller: 'propertyController'
    })
    .when("/mainland_house", {
      templateUrl: "templates/search/mainland_house.html",
      controller: 'propertyController'
    })
    .when("/manor", {
      templateUrl: "templates/search/manor.html",
      controller: 'propertyController'
    })
    .when("/office_space", {
      templateUrl: "templates/search/office_space.html",
      controller: 'propertyController'
    })
    .when("/residential", {
      templateUrl: "templates/search/residential.html",
      controller: 'propertyController'
    })
    .when("/residential_building", {
      templateUrl: "templates/search/residential_building.html",
      controller: 'propertyController'
    })
    .when("/residential_compound", {
      templateUrl: "templates/search/residential_compound.html",
      controller: 'propertyController'
    })
    .when("/service", {
      templateUrl: "templates/search/service.html",
      controller: 'propertyController'
    })
    .when("/shop", {
      templateUrl: "templates/search/shop.html",
      controller: 'propertyController'
    })
    .when("/showroom", {
      templateUrl: "templates/search/showroom.html",
      controller: 'propertyController'
    })
    .when("/staff", {
      templateUrl: "templates/search/staff.html",
      controller: 'propertyController'
    })
    .when("/storehouse", {
      templateUrl: "templates/search/storehouse.html",
      controller: 'propertyController'
    })
    .when("/tower", {
      templateUrl: "templates/search/tower.html",
      controller: 'propertyController'
    })
    .when("/traditional_villa", {
      templateUrl: "templates/search/traditional_villa.html",
      controller: 'propertyController'
    })
    .when("/villa", {
      templateUrl: "templates/search/villa.html",
      controller: 'propertyController'
    })
    .when("/tnc", {
      templateUrl: "templates/termsandconditions.html",
      controller: 'propertyController'
    })
  $locationProvider.html5Mode(true)
});