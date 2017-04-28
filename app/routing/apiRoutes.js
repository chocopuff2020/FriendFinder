var path = require("path");
const _ = require('lodash');
const fs = require('fs');


module.exports = (app)=> {
      var scoreArray= [];
      var scoreList = [];
      var result;
      var friendsList = require('../data/friends.js');

      app.get('/api/friends', (req, res) =>{
        res.json(friendsList);
      });

      app.post("/api/friends",(req, res) => {
            var newFriend =req.body;
            var myScore = Array.from(newFriend.scores,i => Number(i.split(' ')));

            //clear the score array of the previous search
            scoreArray = [];

            friendsList.forEach((personObj) => {

                var scores = Array.from(personObj.scores,i => Number(i.split(' ')));

                var resultArray = [];
                var item;

                _.zipWith(myScore,scores,(a, b) =>{
                  item  = Math.abs(a-b);
                  resultArray.push(item);
                });
                result = _.sum(resultArray);
                scoreArray.push(result);

            });

              var soulMate = _.min(scoreArray);
              var soulMateIndex = scoreArray.indexOf(soulMate);
              var soulMateName = friendsList[soulMateIndex].name;
              res.send(friendsList[soulMateIndex]);
              friendsList.push(newFriend);

      });

};