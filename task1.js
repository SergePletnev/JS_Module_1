function formStringFromEvenLinesSync(filepath) {
    var resultString = '';
    let fs = require('fs');
    let array = fs.readFileSync(filepath).toString().split("\r\n");
    // for(i in array) {
    //     console.log(array[i]);
    // }
    for (let i = 1; i < array.length; i += 2) {
        resultString += array[i];
    }
    return resultString;
}

function formStringFromEvenLinesAsync(filepath) {
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
        // for(let i = 1; i < array.length; i+=2) {
        //     resultString += array[i];
        // }
        console.log(resultString);
    });
}

let filepath = process.argv[2] ? process.argv[2] : './data/1.txt';
console.log(formStringFromEvenLinesSync(filepath));
formStringFromEvenLinesAsync(filepath);
