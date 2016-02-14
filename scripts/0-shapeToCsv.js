//setting up
  var _          = require('lodash'),
      fs         = require('fs'),
			JSONStream = require('JSONStream');

//function to tag tweets
function tagTerm(text, searchTerms){
  var searchText = text.toUpperCase();
	function mapToUpper(item){
		 return item.toUpperCase(); 
	};
	var compareTerms = _.map(searchTerms, mapToUpper);
	//var tag = _.intersection(compareWords, searchCompare);
	var tag = compareTerms.filter( function (s) { return searchText.indexOf(s) > -1; });
	return tag;
}

//write a tweetline
function writeatweetline(strtweetline){
	fs.appendFile("../data/coords.txt", strtweetline + "\n", function(err) {
		if(err) {
			console.log(err);
		} else {
			//console.log("The file was saved!");
		}
	});
}

//read stream stuff
  var opt = fs.createReadStream('../data/hascoords.txt');
opt.setEncoding('utf8');
//make a tweetline
function extractCoords(data){
	var tag = tagTerm(data.text, ['suicide', 'suicidal', 'depressed', 'depression', 'alcoholic']);
	if(!tag[0]){
	  return;
	}
	var coords = data.geo.coordinates;
	var id = data.id;
	var date = data.created_at;
	var followers_count = data.user.followers_count;
	var tweet = data.text.replace(/[^\x00-\x7F]/g, '').replace(/\r?\n|\r/g, '');
	var columns = [tag[0], date, tweet, coords[0], coords[1], followers_count]
	var str = columns.join("\t")
	
	//console.log(str + "\n");
	return str;
} 


var Writable = require('stream').Writable;
var ws = Writable({ objectMode: true });
ws._write = function (chunk, enc, next) {
	var tweetline = extractCoords(chunk);
	if(tweetline){
    writeatweetline(tweetline);
	}
	next();
};


opt.pipe(JSONStream.parse()).pipe(ws);

