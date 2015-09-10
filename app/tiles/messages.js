'use strict';

//angular.module('angularfireSlackApp')
 app.factory('Messages', ['$firebaseArray', 'FirebaseUrl',
   function($firebaseArray, FirebaseUrl){
   var channelMessagesRef = new Firebase(FirebaseUrl+'/channelMessages');
   var userMessagesRef = new Firebase(FirebaseUrl+'userMessages');
   return {
     forChannel: function(channelId){
       var msgs = $firebaseArray(channelMessagesRef.child(channelId));
       return msgs;

     },
     forUsers: function(uid1, uid2){
       var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;
       return $firebaseArray(userMessagesRef.child(path));
     }
   };
 }])

 app.controller('MessagesCtrl',['Users', 'profile', 'channelName', 'messages',
   function(Users, profile, channelName, messages){
   var messagesCtrl = this;
   messagesCtrl.user = Users;
   messagesCtrl.messages = messages;
   messagesCtrl.channelName = channelName;
   messagesCtrl.message = '';

   messagesCtrl.sendMessage = function() {
     if(messagesCtrl.message.length > 0) {
       messagesCtrl.messages.$add({
         uid: profile.$id,
         template: 'channels/partials/message.html',
         body: messagesCtrl.message,
         timestamp: Firebase.ServerValue.TIMESTAMP
       }).then(function(){
         messagesCtrl.message = '';
       })
     }
   }
 }])
