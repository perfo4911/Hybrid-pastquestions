'use strict';

angular.module('app')
.controller('IndexController',['$scope','Forum',function($scope,Forum){
    $scope.articles = Forum.find({
        filter: { limit: 3,'order':'createdAt DESC' }
    });
}])
.controller('paperController',['$scope','Level','Subject','Year','Paper',function($scope,Level,Subject,Year,Paper){
    $scope.paperInfo={};
    $scope.levels = Level.find();
    $scope.subjects = Subject.find();
    $scope.years = Year.find();
    $scope.paper = false;
    
    $scope.search = function(){
        alert($scope.subject_id);
        $scope.searchPromise = Paper.find({filter:{where:{level_id:$scope.levelId,subject_id:$scope.subject_id,year_id:$scope.year_id},include:['level','subject','year']}},function(data){
            if(data[0]){
                $scope.noPaper = "";
                $scope.papers = data;
            }else{
                $scope.papers = "";
                $scope.noPaper = "No Paper Available Now Coming soon!!!";
            }
        },function(err){
            $scope.paperError = err;
        });
    };
}])
.controller('forumController',['$scope','Forum','$localStorage',function($scope,Forum,$localStorage){
    $scope.articles = Forum.find({filter:{'order':'createdAt DESC'}});
    
    
    $scope.postInfo={
        customerId:$localStorage.get('$LoopBack$currentUserId')
    };
    $scope.isLoggedIn= $localStorage.isloggedin('$LoopBack$accessTokenId');
    
    //Post threads to server
    $scope.post= function(){
      $scope.postPromise = Forum.create($scope.postInfo,function(data){
          $scope.postRespond = "Posted Succesfully!!";
          $state.go($state.current, {}, {reload: true});
      },function(err){
          $scope.postRespond = err;
      });
    };
    
}])
.controller('detailController',['$scope','$stateParams','Forum','Comment','$localStorage','$state',function($scope,$stateParams,Forum,Comment,$localStorage,$state){
    //to verify Login
    $scope.LoggedIn=$localStorage.isloggedin('$LoopBack$accessTokenId');
    
    //this will get details of a specific Post with comments
    $scope.article=Forum.findById({id:$stateParams.id,filter:{include:['customer',{'comment':'customer'}]}});
    

    $scope.commentInfo={
        forumId:$stateParams.id,
        customerId:$localStorage.get('$LoopBack$currentUserId')
    };

  //function to post comment
    $scope.comment= function(){
        $scope.commentPromise = Comment.create($scope.commentInfo,function(data){
            $scope.commentRespond= data;
            $scope.commentform.$setPristine();
            $scope.commentInfo={
                forumId:$stateParams.id,
                customerId:$localStorage.get('$LoopBack$currentUserId')
            };
        },function(error){
            $scope.commentRespond = error;
        });
    }


}])
.controller('userController',['$scope','$localStorage','Customer','$state',function($scope,$localStorage,Customer,$state){
    
    //handling user login in controller
    $scope.credentials={};
    
    $scope.LoggedIn=$localStorage.isloggedin('$LoopBack$accessTokenId');
    $scope.username=$localStorage.get('username');
    
    $scope.login=function(){
     $scope.loginPromise=Customer.login($scope.credentials,function(data){
            $localStorage.store("username",data.user.username);
         
         //checking if it is Admin redirect to Admin page
             if($localStorage.isAdmin('username')){
                 $state.go('app.admin', {}, {reload: true});
             }else{
                 $state.go($state.current, {}, {reload: true});
             }
            
        },function(error){
            $scope.loginRespond="Invalid Email or Password "+error.data.error.message;
        });
    };
    // handling user logout
    $scope.logout=function(){
        $localStorage.delete('username');
        Customer.logout().$promise.then(function(err){
            
            $state.go($state.current, {}, {reload: true});
        });
    };
    
    //handling user registration 
    $scope.registerInfo={};
    $scope.register=function(){
     $scope.registerPromise = Customer.create($scope.registerInfo,function(data){
            $scope.registerRespond="Congratulations Registration Successful \n You can Login at the top Navigation Bar";
            
        },function(error){
             $scope.registerRespond=error.data.error.message;
        });
    };
}])
.controller('adminController',['$scope','Level','Upload','Subject','Year','$http','Paper','$state',function($scope,Level,Upload,Subject,Year,$http,Paper,$state){
    
    $scope.levels = Level.find();
    $scope.subjects = Subject.find();
    $scope.years = Year.find();
    $scope.papers = Paper.find({filter:{include:['level','subject','year']}});
   
    $scope.paperInfo={};
    $scope.addPaper= function(){
       
      
      Upload.upload({
            
            url:"api/papers/upload",
            file:$scope.myfile,
            data:$scope.paperInfo
            
        }).then(function(resp){
            $scope.paperRespond = "Posted Successfully";
        },function(err){
            $scope.paperError = "Posting failed "+err;
        });
    };
    
    
    //code to delete papers 
    
    $scope.deletePaper = function(id){
        
        Paper.deleteById({id:id},function(value){
            $scope.deleteRespond =value;
        },function(err){
            $scope.deleteRespond = err;
        });
        
        $state.go($state.current, {}, {reload: true});
    };
    
    
    
}])
;