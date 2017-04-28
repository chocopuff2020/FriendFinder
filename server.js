const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
const _ = require('lodash');
// const setupRoutes = require("./app/routing/apiRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var scoreArray= [];
var scoreList = [];
var friendsList = [
      {
        name: 'Rachel',
        photo:'fsdfsdfs',
        scores: [ '3', '1', '1', '2', '2', '1', '1', '2', '2', '2' ]
      },
      {
        name: 'Coco',
        photo: 'fdsfsd',
        scores: [ '3', '1', '2', '1', '3', '2', '2', '1', '3', '3' ]
      },
      {
        name: 'Monica',
        photo: 'gdfgd',
        scores: [ '2', '1', '4', '2', '2', '2', '2', '2', '2', '1' ]
      }
];



app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname, "./app/public/home.html"));
});
app.get("/survey",(req, res) => {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});
app.get("/api/friends",(req, res) => {
  res.sendFile(path.join(__dirname, "./app/data/friends.js"));
});




app.post("/api/friends",(req, res) => {
      var newFriend =req.body;
      // friendsList.push(newFriend);
      var myScore = Array.from(newFriend.scores,i => Number(i.split(' ')));
      // console.log(myScore);

      friendsList.forEach((personObj) => {

          var scores = Array.from(personObj.scores,i => Number(i.split(' ')));

          var resultArray = [];
          var item;

          _.zipWith(myScore,scores,(a, b) =>{
            item  = Math.abs(a-b);
            resultArray.push(item);
          });
          var result = _.sum(resultArray);
          scoreArray.push(result);

      });

        console.log(scoreArray);
        var soulMate = _.min(scoreArray);
        var soulMateIndex = scoreArray.indexOf(soulMate);
        console.log(soulMateName);

});




// Starts the server to begin listening
// =============================================================
app.listen(PORT,() => {
  console.log("App listening on PORT " + PORT);
});


