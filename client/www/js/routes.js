angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'IndexController'
      }
    }
  })

 .state('menu.login', {
    url: '/page5',
	views:{
		'side-menu21':{
			templateUrl: 'templates/login.html',
            controller: 'userController'
		}
	}
    
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.discussion', {
    url: '/forum',
	views:{
		'side-menu21':{
			templateUrl: 'templates/discussion.html',
            controller: 'forumController'
		}
	}
    
  }).state('menu.details', {
    url: '/forum/:id',
	views:{
		'side-menu21':{
			templateUrl: 'templates/detail.html',
            controller: 'detailController'
		}
	}
    
  })
.state('menu.paper', {
    url: '/paper',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paper.html',
        controller: 'paperController'
      }
    }
  })
  

  .state('menu.signup', {
    url: '/page6',
	views:{
		'side-menu21':{
			templateUrl: 'templates/signup.html',
            controller: 'IndexController'
		}
	}
    
  })

$urlRouterProvider.otherwise('/side-menu21/home')

  

});