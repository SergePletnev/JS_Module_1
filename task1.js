'use strict';

const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

// const Bluebird = require('bluebird');
// const fs = Bluebird.promisifyAll(require('fs'));

function formStringFromEvenLinesSync(filepath) {
    let resultString = '';
    let array;

    try {
        array = fs.readFileSync(filepath).split("\r\n");
    } catch (err) {
        throw err;
    }
    for (let i = 1; i < array.length; i += 2) {
        resultString += array[i];
    }
    return resultString;
}

function formStringFromEvenLinesAsync(filepath, callback) {
    let resultString = '';

    fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) throw err;
        data.split("\r\n").forEach((element, index) => {
            if (index % 2 === 1) resultString += element;
        });

        callback(resultString);
        return;
    });

}

function formStringFromEvenLinesPromise(filepath, callback) {
    let resultString = '';

    readFileAsync(filepath, 'utf-8')
        .then(data => {
            data.split("\r\n").forEach((element, index) => {
                if (index % 2 === 1) resultString += element;
            });
            logResult(resultString);
        })
        .catch(err => {
            throw err;
        });
}

async function formStringFromEvenLinesPromiseAsync(filePath) {
    let resultString = '';

    try {
        const data = await readFileAsync(filePath, { encoding: 'utf8' });
        data.split("\r\n").forEach((element, index) => {
            if (index % 2 === 1) resultString += element;
        });
        logResult(resultString);
    }
    catch (err) {
        console.log('ERROR:', err);
    }
}

const filepath = process.argv[2] ? process.argv[2] : './data/task1_test_data.txt';

// console.log(formStringFromEvenLinesSync(filepath));

// formStringFromEvenLinesAsync(filepath, logResult);

// formStringFromEvenLinesPromise(filepath, logResult);

formStringFromEvenLinesPromise(filepath, logResult);

function logResult(data) {
    console.log(data);
}
