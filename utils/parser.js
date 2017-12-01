var fs = require('fs');
var parse = require('xml-parser');

var xml = fs.readFileSync('./data/od_213_24.xml', 'utf8');
var obj = parse(xml);

module.exports = obj