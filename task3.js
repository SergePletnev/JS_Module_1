function convertJSONFilesToXLSX(inputDir, outputDir) {
    const readDir = require('readdir');
    const json2xls = require('json2xls');
    const fs = require('fs');

    let JSONFiles = readDir.readSync(inputDir, ['**.json'], readDir.ABSOLUTE_PATHS);

    let jsonObjects = [];
    for (let i = 0; i < JSONFiles.length; i++) {
        try {
            obj = JSON.parse(fs.readFileSync(JSONFiles[i], 'utf8'));
        } catch (err) {
            console.log(err);
            continue;
        }
        jsonObjects.push(obj);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    if (jsonObjects.length > 0) {
        let xls = json2xls(jsonObjects);
        let xlsxFileName = 'JSONs.xlsx';
        outputPath = outputDir + '/' + xlsxFileName;
        fs.writeFileSync(outputPath, xls, 'binary');
        return 'Ok';
    } else {
        return 'There is no data to convert to xlsx';
    }
}

const args = require('yargs').argv;

let resultMessage = convertJSONFilesToXLSX(args.inputDir, args.outputDir);
console.log(resultMessage);
