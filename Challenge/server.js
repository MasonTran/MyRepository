var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;


var uriLocal = 'mongodb://localhost:27017/test';
var uriRemote = 'mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge';

app.use(express.static(__dirname + "/public"));


app.get('/movielist', function(req, res) {
	var query = require('url').parse(req.url,true).query;
	var searchTitle = query.searchTitle;
	mongoClient.connect(uriRemote, function(err, db)
	{
		if(err)
		{
			console.log('Unable to connect to server' + err);
		}

		console.log('searchTitle = ' + searchTitle);
		var searchQuery = {};

		var searchKey = "TitleName";

		if (searchTitle != null && searchTitle != 'undefined' && searchTitle != '')
		{
			var pattern = new RegExp('.*'+searchTitle.toLowerCase()+'.*', "i");
			searchQuery[searchKey] = pattern;
		}

		console.log(searchQuery);
/*
display collection info
		db.collections(function(err, result) {
			console.log(result);
		});
*/

		var collection = db.collection('Titles');
		collection.find(searchQuery,{'TitleId':true,'TitleName':true, 'ReleaseYear':true, _id:false}).sort({ "TitleName": 1}).toArray(function(err, result)
		{
			if (err)
			{
				console.log("err = " + err);
				res.send(err);
			}
			else if (result.length)
			{
				console.log("result.length = " + result.length);
				res.json(result);
			}
			else
			{
				var jsonObj = JSON.parse("{}");
				res.json(jsonObj);
			}

			db.close();
		});

	});

});


app.get('/movielist/:id', function(req, res) {
	var id = parseInt(req.params.id);
	console.log("movielist id = " + id);

	mongoClient.connect(uriRemote, function(err, db)
	{
		if(err)
		{
			console.log('Unable to connect to server' + err);
		}

		var searchQuery = {};
		var searchKey = "TitleId";
		searchQuery[searchKey] = id;

		console.log(searchQuery);

		var collection = db.collection('Titles');
		collection.find(searchQuery,{_id:false}).toArray(function(err, result)
		{
			if (err)
			{
				console.log("err = " + err);
				res.send(err);
			}
			else if (result.length)
			{
				console.log("result.length = " + result.length);
//				var jsonString = JSON.stringify(result);
//				console.log("jsonString="+jsonString);
				res.json(result);
			}
			else
			{
				var jsonObj = JSON.parse("{}");
				res.json(jsonObj);
			}

			db.close();
		});

	});

});

app.listen(3000, function() {
	console.log('Listening on port 3000');
	})
