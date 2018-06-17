const readDir = require('readdir');
const json2xls = require('json2xls');
const fs = require('fs')

let JSONFiles = readDir.readSync('./data', ['**.json'], readDir.ABSOLUTE_PATHS);

let jsonObjects = [];
for (let i = 0; i < JSONFiles.length; i++) {
    obj = JSON.parse(fs.readFileSync(JSONFiles[i], 'utf8'));
    jsonObjects.push(obj);
}

let xls = json2xls(jsonObjects[0]);

fs.writeFileSync('./data/JSONs.xlsx', xls, 'binary');


// path as arguments in command line!!