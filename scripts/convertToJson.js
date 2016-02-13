var _ = require('lodash');
var fs = require('fs');

var csvtojson = require('csvtojson');

var helper = require('./helper');
var config = helper.config;

_.each(config.searchTerms, convert);

function convert(term){
  var Converter = csvtojson.Converter;
  var csvConverter = new Converter({constructResult:false, toArrayString: true, delimiter: config.separator});

  var readStream = fs.createReadStream(config.dataPath + term + '.tsv');
  var writeStream = fs.createWriteStream(config.dataPath + term + '.json');

  readStream.pipe(csvConverter).pipe(writeStream);
}