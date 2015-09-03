'use strict';

//angular.module('angularfireSlackApp')
  app.factory('Users', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl',
    function($firebaseArray, $firebaseObject, FirebaseUrl){
    var usersRef = new Firebase(FirebaseUrl+'users');
    var connectedRef = new Firebase(FirebaseUrl+'.info/connected');
    var users = $firebaseArray(usersRef);



    var Users = {
      getProfile: function(uid) {
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid) {
        return users.$getRecord(uid).displayName;
      },
      getGravatar: function(uid) {
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },
      setOnline: function(uid){
        var online = $firebaseArray(usersRef.child(uid+'/online'));
        var connected = $firebaseObject(connectedRef);

        connected.$watch(function(){
          if(connected.$value===true){
            online.$add(true).then(function(connectedRef){
              connectedRef.onDisconnect().remove();
            });
          }
        });
      },
      all: users
    };

    return Users;

  }])

  app.controller('ProfileCtrl', ['$state', 'md5', 'auth', 'profile',
    function($state, md5, auth, profile){
    var profileCtrl = this;
    profileCtrl.profile = profile;

    profileCtrl.updateProfile = function() {
      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      profileCtrl.profile.$save().then(function(){
        $state.go('channels');
      });
    }

  }])
