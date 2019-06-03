// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // a get signUp brings a user to the new signup screen..
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../private/signup.html"));
  });

  // a put signup brings the user to an 'edit the data' page.
  app.put("/signup", function(req, res) {
    var userInfo=req.body;
    res.sendFile(path.join(__dirname, "../private/signup.html"));
  });

  //
  // Note this route is the route that gets fired when requesting the 'matches' html page.
  //   The page is generated using handlebars - based on data that we retrieve from the
  //   database (by this api).
  //
  app.get("/matches/:id", function(req, res) {
    console.log("/matches");
    var myId = req.params.id;
    db.match.findAll({
                      where: {
                        user1: myId},
                      include: [ {model: db.user, as: 'userInfo2'} ]
                    }
                    ).then(function(dbMatches) {

        // We must extract/convert the data from the sequelize model to what 
        //   handlebars needs.
        var matchDataArray = [];
        var matchData;
        dbMatches.forEach(element => {
          matchData = new Object;
          matchData.id = element.dataValues.id;
          matchData.userid = element.dataValues.user2;
          for (fieldName of Object.keys(element.dataValues.userInfo2.dataValues)) {
            if (fieldName != "password") {
              matchData[fieldName] = element.dataValues.userInfo2.dataValues[fieldName];
            }
          }
          matchDataArray.push(matchData);
        });

        //  Now tell handlebars to render the records by passing it an object with the 
        //  match property (required by the coded format, not by handelbars library) and
        //  the array of data objects.
        res.render("matches", {matches: matchDataArray });
    });
  });

  app.get("/matches/js/main.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/main.js"));
  });

  app.get("/matches/js/chat.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/chat.js"));
  });

  app.get("/matches/js/style.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/style.js"));
  });

  app.get("/matches/img/icons/:imgname", function(req, res) {
    var imgName = req.params.imgname;
    res.sendFile(path.join(__dirname, "../public/img/icons/" + imgName));
  });

};
