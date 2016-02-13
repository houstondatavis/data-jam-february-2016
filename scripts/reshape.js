var _ = require('lodash');
var fs = require('fs');
var stream = require('stream');

var JSONStream = require('JSONStream');

var helper = require('./helper');
var config = helper.config;
var tagTerm = helper.tagTerm;

sortTweets(config.dataPath + config.sourceFile, config.searchTerms);

function sortTweets(from, terms){

  var searchTerms = _.map(terms, mapToUpper);

  //read stream stuff
  var opt = fs.createReadStream(from);
  opt.setEncoding('utf8');

  //make a tweetline
  var ws = stream.Writable({ objectMode: true });
  ws._write = _.partial(handleWrite, searchTerms);

  opt
    .pipe(JSONStream.parse())
    .pipe(ws);
}

function handleWrite(searchTerms, chunk, enc, next) {
  var tweetInfo = extractTweetLine(chunk, searchTerms);

  if(tweetInfo.tag){
    writeATweetLine(tweetInfo.tag, tweetInfo.tweetLine);
  }
  next();
}

function mapToUpper(item){
  return item.toUpperCase(); 
}

//write a tweetline
function writeATweetLine(searchTerm, strtweetline){
  var csvFile = config.dataPath + searchTerm.toLowerCase() + '.tsv';

  try {
    fs.accessSync(csvFile, fs.F_OK);
    writeNextLine(csvFile, strtweetline);
  } catch (e) {
    writeNextLine(csvFile, config.header, function(){
      console.info('Writing to ' + csvFile + ' begun.');
      writeNextLine(csvFile, strtweetline);
    });
  }
}

function writeNextLine(file, line, callback){
  fs.appendFile(file, line + "\n", function(err) {
    if (err) {
      console.log(err);
    } else if (_.isFunction(callback)) {
      callback();
    }
  });
}

function extractTweetLine(data, searchTerms){
  var tag = tagTerm(data.text, searchTerms);

  var tweetFeatures = _.map(config.features, function(feature){
    if (_.isFunction(feature.extract)) {
      return feature.extract(data, searchTerms);
    } else if (_.isString(feature.extract)) {
      return _.property(feature.extract)(data) || '';
    }
  });

  var str = tweetFeatures.join(config.separator);

  return {tweetLine: str, tag: tag};
}
