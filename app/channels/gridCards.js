'use strict';



app.controller('Work1Controller', ['$scope', '$rootScope', '$timeout',
  function($scope, $rootScope, $timeout) {
    $scope.showingMoreText = false;

    console.log('Work1Controller');
    $scope.toggleText = function(){
      $scope.showingMoreText = !$scope.showingMoreText;
      // We need to broacast the layout on the next digest once the text
      // is actually shown
      // TODO: for some reason 2 a $timeout is here necessary
      $timeout(function(){
        $rootScope.$broadcast("layout", function(){
          // The layout animations have completed
        });
      }, 20);
    }
}]);

/**
 * The main controller that is responsible for created the cards, filters,
 * rankers
 */
app.controller('GridContainer',
  ['$state',  function ($state) {
      var gridContainer = this;
      gridContainer.filters = [[['tabs', 'contains', 'home']]];
      gridContainer.rankers = null;
      console.log('in containers');
      gridContainer.isDropdownOpen = {
        orderBy: false,
        filter: false
      };

      /**
       * Update the filters array based on the given filter
       * $param filter: the name of a tab like 'work'
       */
      gridContainer.filter = function(filter){
        gridContainer.filters = [[['tabs', 'contains', filter]]];
        console.log('filter: '+ filter);
      }

      gridContainer.isTabActive = function(tab){
        return gridContainer.filters && gridContainer.filters[0][0][2] === tab;
      }

      /**
       * Update the rankers array based on the given ranker
       * $param ranker: the name of a card's property or a custom function
       */
      gridContainer.orderBy = function(ranker){
        gridContainer.rankers = [[ranker, "asc"]];
      }

      gridContainer.isRankerActive = function(ranker){
        return gridContainer.rankers && gridContainer.rankers[0][0] === ranker;
      }

      /**
       * Delete a given card
       * $param index: the index of the card in the cards array
       */
      gridContainer.deleteCard = function(id){
        var index = -1;
        for(i in gridContainer.cards){
          if(gridContainer.cards[i].id == id){
            index = i;
            break;
          }
        }
        if(index !== -1){
          gridContainer.cards.splice(index, 1);
        }
      }

      gridContainer.removeFirstCard = function(){
        gridContainer.deleteCard(gridContainer.filteredItems[0].id)
      }

      /**
       * The pile of cards to be added
       */
      var cardsToAdd =  [
        {
          id: 9,
          template : "channels/partials/work3.html",
          tabs : ["home", "work"],
          added : 1474871272105,
        },
        {
          id: 10,
          template : "channels/partials/work4.html",
          tabs : ["home", "work"],
          added : 1467871272105,
        },
        {
          id: 11,
          template : "channels/partials/education.html",
          tabs : ["home", "education"],
          data : {
            "degree" : "PhD",
            "field": "Artificial Intelligence",
            "school" : "MIT"
          },
          added : 1479871272105
        }
      ];

      /**
       * Add a card to the main view
       * Takes a card from the pile of cardsToAdd and prepend it to the list of
       * cards. Take a card belonging to the selected tab
       */
      gridContainer.addCard = function(){
        var getCurrentTab = function(){
          return gridContainer.filters[0][0][2];
        };

        var getIndexOfNextCardInTab = function(tab){
          var index = -1;

          for(i in cardsToAdd){
            if(cardsToAdd[i].tabs.indexOf(tab) !== -1){
              index = i;
              break;
            }
          }
          return index;
        };

        var index =  getIndexOfNextCardInTab(getCurrentTab());

        if(index !== -1){
          gridContainer.cards.unshift(cardsToAdd[index]);
          cardsToAdd.splice(index, 1);
        }
      }

      /**
       * The list of cards that show initialy
       */
      gridContainer.cards = [
        {
          id: 1,
          template : "channels/partials/work1.html",
          tabs : ["home", "work"],
          data : {
            "position" : "Web Developer",
            "company" : "Hacker Inc."
          },
          added : 1444871272105,
        },
        {
          id: 2,
          template : "channels/partials/work1.html",
          tabs : ["home", "work"],
          data : {
            "position" : "Data Scientist",
            "company" : "Big Data Inc."
          },
          added : 1423871272105,
        },
        {
          id: 4,
          template : "channels/partials/businessCard.html",
          tabs : ["home"],
          added : 1434871272105
        },
        {
          id: 3,
          template : "channels/partials/aboutMe.html",
          tabs : ["home"],
          added : 1454871272105
        },
        {
          id: 5,
          template : "channels/partials/home.html",
          tabs : ["home"],
          added : 1484871272105
        },
        {
          id: 6,
          template : "channels/partials/education.html",
          tabs : ["home", "education"],
          data : {
            "degree" : "Master",
            "field": "Physics",
            "school" : "ETH Zurich"
          },
          added : 1474871272105
        },
        {
          id: 7,
          template : "channels/partials/education.html",
          tabs : ["home", "education"],
          data : {
            "degree" : "Bachelor",
            "field": "Mathematics",
            "school" : "EPFL"
          },
          added : 1464871272105
        },
        {
          id: 8,
          template : "channels/partials/work2.html",
          tabs : ["home", "work"],
          added : 1434871272105
        }
      ];
}]);
