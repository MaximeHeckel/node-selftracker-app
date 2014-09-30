var Activity = require('./models/activity.js');
var Sport = require('./models/sport.js');
module.exports = function(app) {

		// server routes ===========================================================
		// handle things like api calls

		//API ROUTES
		app.get('/api/activities', function(req, res) {
			// use mongoose to get all nerds in the database
          console.log("GET ACTIVITIES")
			Activity.find(function(err, activities) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);
             console.log(activities)
				res.json(activities); // return all nerds in JSON format
			});
		});

      app.get('/api/lastactivity', function(req, res) {
        // use mongoose to get all nerds in the database
            console.log("GET ACTIVITIES")
        Activity.findOne({},{}, {sort:{'date': -1}}, function(err, activity) {

          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
            res.send(err);
               console.log(activity)
          res.json(activity); // return all nerds in JSON format
        });
      });

      app.get('/api/lastrun', function(req, res) {
        // use mongoose to get all nerds in the database
            console.log("GET LAST RUN")
        Sport.findOne({},{}, {sort:{'date': -1}}, function(err, sport) {

          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
            res.send(err);
               console.log(sport)
          res.json(sport); // return all nerds in JSON format
        });
      });

		// route to handle creating (app.post)
		// route to handle delete (app.delete)

		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('/', function(req, res) {
			res.sendfile('./public/index.html'); // load our public/index.html file
		});

		app.get('/detail', function(req, res) {
			res.sendfile('./public/detail.html'); // load our public/index.html file
		})
	};
