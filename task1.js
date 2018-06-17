function formStringFromEvenLinesSync(filepath) {
    let resultString = '';
    let fs = require('fs');
    let array;
    try {
        array = fs.readFileSync(filepath).toString().split("\r\n");
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
    let fs = require('fs');
    fs.readFile(filepath, 'utf-8', function (err, data) {
        if (err) throw err;
        let array = data.toString().split("\r\n");
        for (i in array) {
            if (i % 2 == 1) {
                resultString += array[i];
            }
        }
        callback(resultString);
        return;
    });
}

let filepath = process.argv[2] ? process.argv[2] : './data/test_data.txt';

console.log(formStringFromEvenLinesSync(filepath));

formStringFromEvenLinesAsync(filepath, logResult);

function logResult(data) {
    console.log(data);
}
