var db = require("../models");
var mLogic=require("../routes/match-logic.js");
var users=[];


module.exports = function(app) {
  app.get("/api/users", function(req, res) {
       
    //WHAT SECURITY / LOGIN STUFF DO WE NEED TO BE MINDFUL OF ON THE BACKEND? 
    //   db.User.findAll({}).then(function(dbUsers) {
    //   dbUsers.forEach(element => {
    //   element.password = "****";
    //   });

    db.User.findAll({}).then(function(dbUsers) {
      //initialize scores
      users=dbUsers;
      // console.log({dbUsers});
      mLogic.populateScores(dbUsers);

      for (var x=0;x<dbUsers.length;x++) {
        console.log(
          "First Name: "+dbUsers[x].firstname +   " ".repeat(mLogic.colSpacer(dbUsers[x].firstname))  + " Score:" + dbUsers[x].score
        ); //+"\n")
        var closeArr = mLogic.calculateMatches(dbUsers[x]);
        var matches = mLogic.getMatches(closeArr);
        // console.log(matches);
        tempMatches = JSON.stringify(matches);
        dbUsers[x].matches = JSON.parse(tempMatches);
        // console.log(dbUsers[x].matches);
        // dbUsers[x].matches=users[x].matches;
      }
      res.json(dbUsers);
    });
  });

module.exports={users}


















app.put("/api/login/:email", function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    }).then(function(dbUser) {

      if (dbUser == null) {
        console.log("User not found");
        res.status(404).json("User not found");
        //res.send("404 - User Not Found");
      }
      else if (req.body.password === dbUser.password) {
        console.log("User login ",dbUser.screenname);
        dbUser.password = "****";
        res.status(200);
        res.json(dbUser);
      }
      else {
        console.log("Bad password");
        res.status(401).json("Access denied");
      }
    });
  });






  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Match]
    }).then(function(dbUser) {
      dbUser.password = "****";
      res.json(dbUser);
    });
  });











  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      //just working with score
      console.log(req.body);
      // dbUser=req.body;

      

      res.json(dbUser);
    });
  });












  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};

//********************************************************* */


        // friendScores.push(dbUsers[x].score);
        // calculateUser(dbUsers[x]);
// console.log(array1); // [ 'a', 'c', 'e' ]
// console.log(array2); // [ 'b', 'd', 'f' ]

// console.log(closestMatches);

// for (x in closestArr)
// {
//   var friendMatch;
//   if(users[x].score===closestArr[x])
//   {
//       friendMatch=users[x];
//       // console.log(friendMatch);
//    closestMatches.push(friendMatch.firstname);
//     }
// }
// return closestMatches;
//  return matches;
//SEND MATCHES BACK
// res.json(friendMatch);
// scoreFriend(newfriend);
// var closest=logScores(newfriend);
// var friendMatch=getMatch(closest);

// req.body  is equal to the JSON post sent from the user
//JUST AN EXAMPLE OF WHERE WE ARE GRABBING ...
//  ;
// Using a RegEx Pattern to remove spaces from newfriend
// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
// newfriend.routeName = newfriend.name.replace(/\s+/g, '').toLowerCase();
// console.log(newfriend.firstname+newfriend.score);

// for(x=0;x<5;x++)
// {

// var closest = copyScores.reduce(function(prev, curr) {
//     return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
//   });
//   console.log("Nearest Match's Score: "+closest);
//   closestArr.push(closest);
//   // copyScores.pop(copyScores.indexOf(closest));
// }
// //add it back to not mess up count?
// // copyScores.push(newfriend.score);
// function scoreFriend(newfriend){

// for(x in newfriend.textArr)
// {
//     textScore=sentiment.analyze(newfriend.textArr[x]);
//     console.log(textScore);
//     scoreArr.push([newfriend.textArr[x],textScore.score]);
//     scoreTotal+=parseInt(textScore.score);

// }
// // console.log(scoreTotal);

// newfriend.scoreArr=scoreArr;
// newfriend.score=scoreTotal;
// friends.push(newfriend);

// }

// function logScores(){

// console.log("All Scores: "+friendScores);
// var copyScores=friendScores;

// var goal=newfriend.score;
// console.log("Current User's Score: "+goal);
// if(copyScores.length!==0)
// {
// var closest = copyScores.reduce(function(prev, curr) {
//     return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
//   });
// }
//   console.log("Nearest Match's Score: "+closest);
//   friendScores.push(goal);

//   return closest;

// }

// function getMatch(closest){

// var friendMatch;

// for(x in friends)
// {
//    if(friends[x].score===closest)
//    {
//        friendMatch=friends[x];
//    }
// }

// console.log(friendMatch);

// return friendMatch;
// }
