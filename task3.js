'use strict';

const readDir = require('readdir');
const json2xls = require('json2xls');
const fs = require('fs');
const args = require('yargs').argv;

function convertJSONFilesToXLSX(inputDir, outputDir) {
    let JSONFiles = readDir.readSync(inputDir, ['**.json'], readDir.ABSOLUTE_PATHS);
    let jsonObjects = [];

    JSONFiles.forEach(jsonFile => {
        obj = require(jsonFile);
        jsonObjects.push(obj);
    })

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    if (jsonObjects.length > 0) {
        const xls = json2xls(jsonObjects);
        const xlsxFileName = 'JSONs.xlsx';
        outputPath = outputDir + '/' + xlsxFileName;
        fs.writeFileSync(outputPath, xls, 'binary');
        return 'Ok';
    } else {
        return 'There is no data to convert to xlsx';
    }
}

const inputDir = (args.inputDir) ? args.inputDir : './data';
const outputDir = (args.outputDir) ? args.outputDir : './data';
let resultMessage = convertJSONFilesToXLSX(inputDir, outputDir);
console.log(resultMessage);
