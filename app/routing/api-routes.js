var friendArray = require('../data/friends.js');

module.exports = function(app) {

  app.get('/api/friends', function (req, res) {
    res.json(friendArray);
  });

  app.post('/api/friends', function (req, res) {
    var newAnswers = req.body.answers;

    //the smaller the difference value is, the better the match
    var difference = [];

    //index of the arrays that corresponds to the lowest difference
    var bestMatch = 0;

    //loops through current friends array
    for (var i=0; i<friendArray.length; i++) {
      var currentDifference = 0;
      //loops through each answer for each comparison
      for (var p=0; p<friendArray[i].answers.length; p++) {
        currentDifference += Math.abs(parseInt(friendArray[i].answers[p]) - parseInt(newAnswers[p]));
      }
      difference.push(currentDifference);
    }

    for (var i=1; i<difference.length; i++) {
      if (difference[i] < difference[bestMatch]) {
        bestMatch = i;
      }
    }

    res.json(friendArray[bestMatch]);
    friendArray.push(req.body);
  });

}