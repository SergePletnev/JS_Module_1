function getObjectFromJSON(filepath) {
    const fs = require('fs');
    let obj;
    try {
        obj = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch (err) {
        throw err;
    }
    return obj;
}

function checkObjectValues(obj) {
    let incorrectValues = {}

    if (typeof (obj.flag) !== 'boolean') {
        incorrectValues['flag'] = obj.flag;
    }
    if (!Array.isArray(obj.myPromises)) {
        incorrectValues['myPromises'] = obj.myPromises;
    }
    if (typeof (obj.element) !== 'object') {
        incorrectValues['element'] = obj.element;
    }
    if (typeof (obj.screenshot) !== null) {
        incorrectValues['screenshot'] = obj.screenshot;
    }
    if (typeof (obj.elementText) !== 'string') {
        incorrectValues['elementText'] = obj.elementText;
    }
    if (typeof (obj.allElementsText) !== 'string' || !obj.allElementsText.includes('const')) {
        incorrectValues['allElementsText'] = obj.allElementsText;
    }
    if (typeof (obj.counter) !== 'number' || obj.counter <= 10) {
        incorrectValues['counter'] = obj.counter;
    }
    if (obj.config !== 'Common') {
        incorrectValues['config'] = obj.config;
    }
    if (obj.const.toUpperCase() !== 'FiRst'.toUpperCase()) {
        incorrectValues['const'] = obj.const;
    }
    if (!Array.isArray(obj.parameters) || obj.parameters.length !== 8) {
        incorrectValues['parameters'] = obj.parameters;
    }
    if (typeof (obj.description) !== 'string' || obj.description.length <= 5 || obj.description.length >= 10) {
        incorrectValues['description'] = obj.description;
    }
    return incorrectValues;
}

function writeResult(result) {
    if (Object.keys(result).length > 0) {
        const fs = require('fs');
        let data = JSON.stringify(result, null, 2);
        let filepath = "./data/task2_result.txt";
        fs.writeFileSync(filepath, data);
    } else {
        console.log('Ok');
    }
}

let filepath = process.argv[2] ? process.argv[2] : './data/3.json';
let obj = getObjectFromJSON(filepath);
let result = checkObjectValues(obj);
writeResult(result);